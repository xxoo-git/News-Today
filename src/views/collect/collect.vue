<!-- 视图层 -->
<template>
    <van-nav-bar class="app-nav-bar" title="收藏列表" left-arrow @click-left="$router.back()" />
    <div class="content"></div>
    <ArticleItem v-for="(article, index) in $store.state.userCollect" :key="index" :article="article"></ArticleItem>
</template>

<!-- 逻辑层 -->
<script setup>
import ArticleItem from "~/components/article-item/index.vue";
import { ref } from 'vue'
import { useStore } from "vuex";
const store = useStore();

if (store.state.userCollect) {
    store.dispatch("getUserCollect");
}


</script>

<!-- 样式层 -->
<style lang="less" scoped>
.app-nav-bar {
    position: fixed;
    width: 100%;
}
.content{
    padding-top: 90px;
}
</style>1