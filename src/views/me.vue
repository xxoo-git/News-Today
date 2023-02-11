<!-- 视图层: html -->
<template>
  <div class="my-container">
    <!-- 已登录：用户信息 -->
    <div v-if="$store.state.user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image round fit="cover" class="avatar" :src="$store.state.userInfo.photo" />
          <span class="name">{{ $store.state.userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round is-link to="/compile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ $store.state.userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item" @click="attentionList()">
          <span class="count">{{ $store.state.userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item" @click="fansList()">
          <span class="count">{{ $store.state.userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ $store.state.userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <div class="img">
          <span class="iconfont icon-shoujihaoma"></span>
        </div>
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 导航 -->
    <van-grid clickable :column-num="2" class="grid-nav">
      <van-grid-item class="grid-item" is-link to="/collectList">
        <i slot="icon" class="news news-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item" is-link to="/historyList" >
        <i slot="icon" class="news news-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- <van-cell title="消息通知" is-link to="/" class="cell" /> -->

    <van-cell title="小智同学" is-link :to="{
        name: 'sMate',
        params: {
          articleId: '小智同学',
        },
      }" class="cell" v-if="$store.state.user" />
    <div v-else></div>
    <van-cell clickable @click="onLogout" v-if="$store.state.user" title="退出登录" class="exit" />
  </div>
</template>
<!-- 逻辑层：js -->
<script setup>
import { showConfirmDialog } from "vant";
import "vant/es/dialog/style";
import "vant/es/toast/style";

import { useStore } from "vuex";
import router from "../router";
const store = useStore();

if (store.state.user) {
  store.dispatch("getInfo");
}

function onLogout() {
  showConfirmDialog({
    title: "确认退出吗？",
  })
    .then(() => {
      // on confirm
      // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
      store.commit("setUser", null);
    })
    .catch(() => {
      // on cancel
      console.log("取消");
    });
}

const attentionList = () => {
  router.push('/attentionList')
}
const fansList = () => {
  router.push('/fansList')
}
</script>


<style lang="less"  scoped>
.my-container {
  margin-bottom: 200px;

  .header {
    height: 461px;
    background-color: rgb(197, 66, 34);
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .img {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 132px;
        height: 132px;
        background-color: #fff;
        border-radius: 50%;

        .icon-shoujihaoma {
          position: absolute;
          font-size: 70px;
          color: rgb(197, 66, 34);
        }
      }

      .text {
        color: #fff;
        font-size: 32px;
        margin-top: 18px;
      }
    }
  }

  .user-info {
    .base-info {
      height: 331px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;

        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 1px solid #fff;
        }

        .name {
          font-size: 32px;
          color: #fff;
        }
      }
    }

    .data-stats {
      display: flex;

      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;

        .count {
          font-size: 36px;
        }

        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {
    margin-bottom: 15px;

    .grid-item {
      height: 141px;

      i.news {
        font-size: 45px;
        color: rgb(197, 66, 34);
      }

      span.text {
        font-size: 28px;
        margin-top: 10px;
      }
    }
  }

  .cell {
    font-size: 30px;
  }

  .exit {
    text-align: center;
    margin-top: 15px;
    font-size: 30px;
    color: rgb(197, 66, 34);
  }
}
</style>

