<!-- 视图层: html -->
<template>
  <div class="search-result">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <ArticleItem v-for="(article, index) in list" :key="index" :article="article"></ArticleItem>
      <!-- <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      /> -->
    </van-list>
  </div>
</template>
<!-- 逻辑层：js -->
<script setup>
import ArticleItem from "~/components/article-item/index.vue";
import { ref } from "vue";
import { getSearchResult } from "~/api/search.js";
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const page = ref(1); //页数，不传默认为1
const per_page = ref(10); //每页数量，不传每页数量由后端决定
const props = defineProps({
  searchText: {
    type: String,
    required: true,
  },
});
async function onLoad() {
  // 1.请求获取数据
  const { data } = await getSearchResult({
    page: page.value, //页数，不传默认为1
    per_page: per_page.value, //每页数量，不传每页数量由后端决定
    q: props.searchText, //搜索关键词
  });
  // 2.将数据放到数据列表中
  const { results } = data.data;
  list.value.push(...results);
  // 3.关闭本次loading
  loading.value = false;
  // 4.判断是否还有数据

  if (results.length) {
    // 如果有，则更新获取下一页数据页码
    page.value++;
  } else {
    // 如果没有，则把finished设置为true，关闭加载更多
    finished.value = true;
  }
  console.log(data);
}
</script>

<style lang="less" scoped>
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  top: 108px;
  bottom: 0;
  overflow-y: auto;
}
</style>
