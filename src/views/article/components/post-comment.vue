<!-- 视图层: html -->
<template>
  <div class="post-comment">
    <van-field
      border
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="500"
      placeholder="请输入评论"
      show-word-limit
    />
    <van-button
      :disabled="!message"
      @click="onPost"
      class="post-btn"
      type="danger"
      size="small"
      >发布</van-button
    >
  </div>
</template>
<!-- 逻辑层：js -->
<script setup>
import { ref } from "vue";
import { addComment } from "~/api/comment.js";
import { showLoadingToast, showSuccessToast } from "vant";
import "vant/es/toast/style";
const message = ref("");
const emit = defineEmits(["post-success"]);

const props = defineProps({
  target: {
    type: [String, Number, Object],
    required: true,
  },
  articleId: {
    type: [String, Number, Object],
    default: null,
  },
});
async function onPost() {
  showLoadingToast({
    message: "加载中...",
    forbidClick: true, //禁止背景点击
  });
  // 找到数据接口
  // 封装请求方法
  // 请求提交数据
  const { data } = await addComment({
    target: props.target.toString(), //评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
    content: message.value, //评论内容
    art_id: props.articleId ? props.articleId.toString() : null, //文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
  });
  console.log(data);
  emit("post-success", data.data.new_obj);

  // 处理响应结果
  showSuccessToast("发布成功");
  //发布成功，清空文本框内容
  message.value = "";
}
</script>

<style lang="less" scoped>
.post-btn {
  position: absolute;
  right: 30px;
  margin-top: 30px;
}
</style>
