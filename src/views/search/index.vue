<!-- 视图层: html -->
<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <!-- focus	获取输入框焦点 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
        @cancel="$router.back"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <SearchResult :search-text="searchText" v-if="isResultShow"> </SearchResult>
    <!-- 联想建议 -->
    <SearchSuggestion
      @search="onSearch"
      v-else-if="searchText"
      :search-text="searchText"
    ></SearchSuggestion>
    <!-- 历史记录 -->
    <SearchHistory
      @search="onSearch"
      v-else
      :search-histories="searchHistories"
      @update-histories="searchHistories = $event"
    >
    </SearchHistory>
  </div>
</template>
<!-- 逻辑层：js -->
<script setup>
import SearchSuggestion from "./components/search-suggestion.vue";
import SearchHistory from "./components/search-history.vue";
import SearchResult from "./components/search-result.vue";
import { getItem, setItem } from "~/utils/storage.js";

import { ref, watch } from "vue";
const searchText = ref("");
const isResultShow = ref(false); //控制搜索结果的显示状态
const searchHistories = ref(getItem("search-histories") || []); //搜索历史数据
// 监视搜索历史记录的变化，存储到本地存储
watch(
  () => searchHistories.value,
  () => {
    setItem("search-histories", searchHistories.value);
  }
);
function onSearch(searchTexts) {
  // 把输入框设置为你要搜索的文本
  searchText.value = searchTexts;
  const index = searchHistories.value.indexOf(searchTexts);
  if (index !== -1) {
    // 把重复项删除
    searchHistories.value.splice(index, 1);
  }
  // 记录搜索历史记录
  searchHistories.value.unshift(searchTexts);
  // 如果用户已登录，则把搜索历史记录存储到线上
  // 提示：只要我们调用获取搜索结果的数据接口，后端会给我们自动存储用户的搜索历史记录
  // 如果没有登录，则把搜索历史记录存储到本地
  setItem("search-histories", searchHistories.value);
  //展示搜索结果
  isResultShow.value = true;
}
</script>

<style lang="less" scoped>
</style>
