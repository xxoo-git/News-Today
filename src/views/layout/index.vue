<!-- 视图层: html -->
<template>
  <div class="layout-container">
    <!-- 子路由的出口 -->
    <router-view></router-view>
    <!-- 标签导航栏 -->

    <van-tabbar route="true" v-model="active" active-color="rgb(197, 66, 34)">
      <van-tabbar-item replace to="/home" icon="wap-home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item replace to="/news" icon="chat-o">消息</van-tabbar-item>
      <van-tabbar-item replace to="/me" icon="user-o">{{
        $store.state.user ? "我的" : "未登录"
      }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<!-- 逻辑层：js -->
<script setup>
import { ref } from "vue";
const active = ref(0);
</script>

<style  scoped>
</style>
