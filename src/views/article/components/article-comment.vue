<!-- 视图层: html -->
<template>
  <div class="article-comments">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
        @reply-click="$emit('reply-click', $event)"
        :type="type"
      ></CommentItem>
      <!-- <van-cell
        v-for="(comment, index) in list"
        :key="index"
        :title="comment.content"
      /> -->
    </van-list>
  </div>
</template>
<!-- 逻辑层：js -->
<script setup>
import { ref } from "vue";
import { getComments } from "~/api/comment.js";
import CommentItem from "./comment-item.vue";

// const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const offset = ref(null); //获取下一页数据的页码
const limit = ref(10); //每页大小
const emit = defineEmits(["update-total-count"]);

const props = defineProps({
  // 如果获取文章评论，则传文章id
  // 如果获取评论回复，则传评论id
  source: {
    type: [Number, String, Object],
    required: true,
  },
  type: {
    type: String,
    default: "a",
  },
  list: {
    type: Array,
    // 数组或对象的默认值必须通过函数返回
    default: function () {
      return [];
    },
  },
});
async function onLoad() {
  // 1.请求获取数据
  const { data } = await getComments({
    type: props.type, //评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
    source: props.source, //源id，文章id或评论id
    offset: offset.value, //获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
    limit: limit.value, //获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
  });
  console.log(data);
  emit("update-total-count", data.data.total_count);
  // 2.把数据放到列表中
  const { results } = data.data;
  props.list.push(...results);
  // 3.将本次的loading关闭
  loading.value = false;
  // 4.判断是否还有数据
  if (results.length) {
    // 如果有，更新获取下一页数据的页面
    offset.value = data.data.last_id; //本次返回结果的最后一个评论id，作为请求下一页数据的offset参数，若本次无具体数据，则值为NULL
    // 如果没有，则将finished设置为true，不再触发加载更多
  } else {
    finished.value = true;
  }
}
</script>

<style lang="less" scoped>
</style>
