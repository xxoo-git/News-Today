<!-- 视图层: html -->
<template>
  <van-nav-bar class="app-nav-bar" title="问答" left-arrow @click-left="btn" />
  
  <div class="co" v-if="$store.state.user">
    <van-cell center class="user-info" v-for="item in date" :to="{
      name: 'sMate',
      params: {
        articleId: item.name,
      },
    }">
      <template #title>
        <div class="name">{{ item.name }}</div>
      </template>
      <template #icon>
        <van-image fit="cover" round class="avatar" :src="item.ico_img" />
      </template>
    </van-cell>
  </div>
  <div class="if" v-else>请先登录</div>
</template>
<!-- 逻辑层：js -->
<script setup>
import router from "../router";
import { get } from '../utils/http'
import { ref } from 'vue'

const date = ref([])
const btn = () => {
  router.push('/home')
}

getdate();
async function getdate() {
  const res = await get('/api/problem');
  date.value = res.data
  console.log(date.value);
}

</script>


<style lang="less" scoped>
.if{
  padding-top: 400px;
  color: #b4b4b4;
  text-align: center;
}
.co {
  padding-top: 80px;
}

.content {
  font-size: 32px;
  // margin-top: 20px;
  background-color: #fff;
  margin-left: 30px;
  margin-right: 30px;
  padding: 30px;
  // border-radius: 20px;

  .list {
    display: flex;

    .index {
      width: 10%;
      color: red;
    }

    .text {
      flex: 1;

      div:nth-child(2) {
        font-size: 20px;
        margin-top: 20px;
      }

      span:nth-child(2) {
        margin-left: 20px;

      }
    }

    .img {
      width: 200px;
      background-color: rgb(203, 201, 198);

      img {
        width: 100%;
        height: 100%;
      }
    }

  }
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