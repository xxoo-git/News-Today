<!-- 视图层 -->
<template>
  <van-nav-bar class="app-nav-bar" title="关注列表" left-arrow @click-left="$router.back()" />
  <van-cell center class="user-info" v-for="item in $store.state.userAtt" key="item.id">
    <template #title>
      <div class="name">{{ item.name }}</div>
    </template>
    <template #icon>
      <van-image fit="cover" round class="avatar" :src="item.photo" />
    </template>
    <van-button :icon="$store.state.article.is_followed ? '' : ''" :class="$store.state.article.is_followed ? '' : ''"
      round size="small" :loading="isFollowLoading" @click="onFollow(item.id)">{{
  $store.state.article.is_followed ?
    "取消关注" : "取消关注"
      }}</van-button>
  </van-cell>
</template>
<!-- 逻辑层 -->
<script setup>
import { ref ,nextTick} from 'vue'
import { useStore } from "vuex";
import { addFollow, deleteFollow } from "~/api/user.js";
import router from '../../router';
const store = useStore();


const isFollowLoading = ref(false);
if (store.state.userAtt) {
  store.dispatch("getUserAtt");
}

async function onFollow(id) {
  isFollowLoading.value = true;
  if (store.state.article.is_followed) {
    console.log("取消关注");
    await deleteFollow(id);
    location.reload();
  }
  store.state.article.is_followed = !store.state.article.is_followed;
  isFollowLoading.value = false;
}
</script>

<!-- 样式层 -->
<style lang="less" scoped>
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
  padding-top: 100px;

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

