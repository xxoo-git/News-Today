<!-- 视图层 -->
<template>
  <van-nav-bar class="app-nav-bar" title="视频详情" left-arrow @click-left="$router.back()" />
  <div class="content">
    <!-- 头部 -->
    <h6 class="title">{{ data.title }}</h6>
    <van-cell center class="user-info">
      <template #title>
        <div class="name">{{ data.name }}</div>
      </template>
      <template #icon>
        <van-image fit="cover" round class="avatar" :src="data.ico_img" />
      </template>
      <template #label>
        <div class="pubdate">{{ data.time }}</div>
      </template>
      <van-button id="btn" :icon="data.Follow ? 'plus' : ''" :class="data.Follow ? 'follow-btn' : ''" round
        size="small" :loading="isFollowLoading" @click="onFollow(data)">{{ data.Follow ? "关注" : "取消关注" }}</van-button>
    </van-cell>

    <!--内容  -->
    <div class="markdown-body content">{{ data.content }}</div>

    <!-- 视频 -->
    <video class="wh" :src="data.video" controls>

    </video>

    <!--底部  -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small">
        写评论
      </van-button>
      <van-icon name="comment-o" badge="99+" color="#777"></van-icon>
      <van-icon @click="onCollect" :color="$store.state.article.is_collected ? '#777' : '#777'"
        :name="$store.state.article.is_collected ? 'star-o' : 'star-o'"></van-icon>
      <van-icon @click="onLike" :color="$store.state.article.attitude === 1 ? '#777' : '#777'"
        :name="$store.state.article.attitude === 1 ? 'good-job-o' : 'good-job-o'"></van-icon>
      <van-icon color="#777" name="share"></van-icon>
    </div>
  </div>

</template>

<!-- 逻辑层 -->
<script setup>
import { ref, nextTick } from 'vue'
import { get, post, patch } from "../../utils/http";
const data = ref([])
const id = ref()

const props = defineProps({
  articleId: {
    type: [String, Number, Object],
    required: true,
  },
});

async function onFollow(data) {
  if (data.Follow == true) {
    await patch(`/api/infomation/${data.id}`, {
      Follow: false
    }).then((res) => {
    })
  } else {
    await patch(`/api/infomation/${data.id}`, {
      Follow: true
    }).then((res) => {
    })
  }
  await nextTick(() => {
    sendRequest();
  })
}

sendRequest();
async function sendRequest() {
  const res = await get(`/api/infomation/${props.articleId}`);
  data.value = res.data;
}


</script>

<!-- 样式层 -->
<style lang="less" scoped>
.wh {
  width: 100%;
  height: 400px;
  margin-bottom: 200px;
}

.content {
  padding-top: 100px;
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