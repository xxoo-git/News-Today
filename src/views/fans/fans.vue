<!-- 视图层 -->
<template>
  <van-nav-bar class="app-nav-bar" title="粉丝列表" left-arrow @click-left="$router.back()" />
  <div class="co">
  <van-cell center class="user-info" v-for="item in $store.state.userFans" key="item.id">
    <template #title>
      <div class="name">{{ item.name }}</div>
    </template>
    <template #icon>
      <van-image fit="cover" round class="avatar" :src="item.photo" />
    </template>
  </van-cell>
</div>
</template>

<!-- 逻辑层 -->
<script setup>
import { ref } from 'vue'
import { useStore } from "vuex";
import router from '../../router';
const store = useStore();
if (store.state.userFans) {
  store.dispatch("getUserFans");
}
</script>

<!-- 样式层 -->
<style lang="less" scoped>
.co{
  padding-top: 80px;
}
.app-nav-bar {
  position: fixed;
  width: 100%;
}

.title {
  font-size: 40px;
  color: #3a3a3a;
  padding: 34px;
  background-color: #fff;
  margin: 0;
}

.user-info {

  .avatar {
    width: 85px;
    height: 85px;
    margin-right: 15px;
  }

  .name {
    font-size: 25px;
    color: #333;
  }

  .pubdate {
    font-size: 20px;
    color: #b4b4b4;
  }

  .follow-btn {
    width: 150px;
    height: 70px;
    background-color: rgb(197, 66, 34);
    color: #fff;
    border: none;
  }
}

.markdown-body {
  padding: 34px;
  background-color: #fff;
}

.article-bottom {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #fff;

  .comment-btn {
    width: 300px;
  }
}
</style>