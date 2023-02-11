<!-- 视图层 -->
<template>
    <van-nav-bar class="app-nav-bar" title="阅读历史列表" left-arrow @click-left="$router.back()" />
    <ArticleItem v-for="(article, index) in $store.state.userHistory" :key="index" :article="article"></ArticleItem>
</template>

<!-- 逻辑层 -->
<script setup>
import ArticleItem from "~/components/article-item/index.vue";
import { useStore } from "vuex";
const store = useStore();
if (store.state.userHistory) {
    store.dispatch("getUserHistory");
}
</script>

<!-- 样式层 -->
<style lang="less" scoped>
.app-nav-bar {
    position: fixed;
    width: 100%;
}
</style>