<!-- 视图层: html -->
<template>
  <div class="po">
    <div class="video" v-for="item in date" :key="item.id">
      <van-cell class="article-item" :to="{
        name: 'videoDetail',
        params: {
          articleId: item.id,
        },
      }">
        <!-- <router-link to="/videoDetail">11</router-link> -->
        <div class="video-top">
          <div class="img">
            <img :src="item.ico_img" alt="" />
            <span>{{ item.name }}</span>
          </div>
          <div class="more">
            <span>关注</span>
            <i class="iconfont icon-weibiaoti5" style="font-size: 20px; color: rgb(153, 153, 153)"></i>
          </div>
        </div>
        <p class="text">{{ item.title }}</p>
        <div class="play">
          <img :src="item.img" alt="" />
          <span class="iconfont icon-zanting1"></span>
        </div>
        <div class="bottom">
          <div>
            <span class="iconfont icon-fenxiang"></span>
            分享
          </div>
          <div>
            <span class="iconfont icon-shoucang"></span>
            收藏
          </div>
          <div>
            <span class="iconfont icon-pinglun"></span>
            659
          </div>
          <div>
            <span class="iconfont icon-dianzan"></span>
            赞
          </div>
        </div>
      </van-cell>
    </div>
  </div>
</template>
<!-- 逻辑层：js -->
<script setup>
import { get } from "../../utils/http";
import { ref } from 'vue'
import router from "../../router";
const props = defineProps({
  date: {
    type:  Object,
    required: true,
  },
});
// const username = ref('张三')
// const date = ref([])
// async function sendRequest() {
//   const res = await get("/api/infomation");
//   date.value = res.data;
// }
// sendRequest();
const btn = () => {
  router.push('/home')
}
</script>

<style scoped>
.van-cell {
  padding: 0;
}

.app-nav-bar {
  position: fixed;
  top: 0;
  width: 100%;
}

.po {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 100px;
  top: 86px;
  overflow-y: auto;
}

.video {
  background-color: #fff;
  border-radius: 20px;
  margin: 20px;
  padding: 20px 35px;

}

.video .video-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.video .video-top .img img {
  width: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

.video .video-top .img span {
  font-size: 30px;
}

.video .video-top .img {
  display: flex;
  align-items: center;
}

.video .video-top .more {
  display: flex;
  align-items: center;
}

.video .video-top .more span {
  color: rgb(197, 66, 34);
  margin-right: 20px;
  font-size: 30px;
}

.video .text {
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: left;
}

.video .play img {
  width: 100%;
}

.video .play {
  position: relative;
}

.video .play .icon-zanting1 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 60px;
  color: #fff;
}

.video .bottom {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.video .bottom div {
  display: flex;
  align-items: center;
  font-size: 30px;
}

.video .bottom .iconfont {
  font-size: 40px;
  margin-right: 10px;
}
</style>
