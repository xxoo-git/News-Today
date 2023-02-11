<!-- 视图层: html -->
<template>
  <div class="article-container">
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="article-wrap">
      <h1 class="title">{{ $store.state.article.title }}</h1>
      <van-cell center class="user-info">
        <template #title>
          <div class="name">{{ $store.state.article.aut_name }}</div>
        </template>
        <template #icon>
          <van-image
            fit="cover"
            round
            class="avatar"
            :src="$store.state.article.aut_photo"
          />
        </template>
        <template #label>
          <div class="pubdate">{{ $store.state.article.pubdate }}</div>
        </template>
        <van-button
          :icon="$store.state.article.is_followed ? '' : 'plus'"
          :class="$store.state.article.is_followed ? '' : 'follow-btn'"
          round
          size="small"
          :loading="isFollowLoading"
          @click="onFollow"
          >{{
            $store.state.article.is_followed ? "已关注" : "关注"
          }}</van-button
        >
      </van-cell>
      <div
        ref="articleContent"
        v-html="$store.state.article.content"
        class="markdown-body content"
      ></div>
      <!-- 文章评论 -->
      <ArticleComment
        @update-total-count="totalCommentCount = $event"
        :list="commentList"
        :source="articleId"
        @reply-click="onReplyClick"
      ></ArticleComment>
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        @click="isPostShow = true"
        class="comment-btn"
        type="default"
        round
        size="small"
      >
        写评论
      </van-button>
      <van-icon
        name="comment-o"
        :badge="totalCommentCount"
        color="#777"
      ></van-icon>
      <van-icon
        @click="onCollect"
        :color="$store.state.article.is_collected ? 'orange' : '#777'"
        :name="$store.state.article.is_collected ? 'star' : 'star-o'"
      ></van-icon>
      <van-icon
        @click="onLike"
        :color="$store.state.article.attitude === 1 ? 'red' : '#777'"
        :name="$store.state.article.attitude === 1 ? 'good-job' : 'good-job-o'"
      ></van-icon>
      <van-icon
        @click="isShowShare = true"
        color="#777"
        name="share"
      ></van-icon>
    </div>
    <!-- 发布评论 -->
    <!-- 底部弹出 -->
    <van-popup
      :style="{ height: '30%' }"
      v-model:show="isPostShow"
      position="bottom"
    >
      <PostComment
        @post-success="onPostSuccess"
        :target="articleId"
      ></PostComment>
    </van-popup>
    <!-- 评论回复 -->
    <van-popup
      :style="{ height: '100%' }"
      v-model:show="isReplyShow"
      position="bottom"
    >
      <CommentReply
        v-if="isReplyShow"
        @close="isReplyShow = false"
        :comment="ReplyComment"
        :article-id="articleId"
      ></CommentReply>
    </van-popup>
    <!-- 分享面板 -->
    <van-share-sheet
      v-model:show="isShowShare"
      title="立即分享给好友"
      :options="options"
    />
  </div>
</template>
<!-- 逻辑层：js -->
<script setup>
import ArticleComment from "~/views/article/components/article-comment.vue";
import { ref, nextTick, provide } from "vue";
import PostComment from "./components/post-comment.vue";
import CommentReply from "./components/comment-reply.vue";
import "~/views/article/github-markdown.css";
import {
  getArticleById,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike,
} from "~/api/article.js";
import { addFollow, deleteFollow } from "~/api/user.js";

// 在组件中获取动态路由参数
// 方式一：this.$route.params.articleId
// 方式二：props传参，this.articleId
import { useStore } from "vuex";
import { showImagePreview } from "vant";
import "vant/es/image-preview/style";
import { showSuccessToast, showLoadingToast } from "vant";
import "vant/es/toast/style";
const store = useStore();
const isFollowLoading = ref(false); //关注用户按钮的loading状态
const isCollectLoading = ref(false); //收藏按钮的loading状态
const isPostShow = ref(false); //控制发布评论的显示状态
const commentList = ref([]); //文章评论列表
const totalCommentCount = ref(0); //评论总数量
const isReplyShow = ref(false); //控制回复的显示状态
const ReplyComment = ref({}); //当前回复评论对象
const isShowShare = ref(false); //控制分享的显示状态
const options = [
  [
    { name: "微信", icon: "wechat" },
    { name: "朋友圈", icon: "wechat-moments" },
    { name: "微博", icon: "weibo" },
    { name: "QQ", icon: "qq" },
  ],
  [
    { name: "复制链接", icon: "link" },
    { name: "分享海报", icon: "poster" },
    { name: "二维码", icon: "qrcode" },
    { name: "小程序码", icon: "weapp-qrcode" },
  ],
];
const props = defineProps({
  articleId: {
    type: [String, Number, Object],
    required: true,
  },
});
const articleContent = ref(null); // 获取文章内容DOM容器
getArticleById(props.articleId).then((res) => {
  console.log(res.data.data);
  store.commit("setArticle", res.data.data);

  // console.log(articleContent.value);
  // 数据改变影响视图更新（DOM数据）不是立即的
  // 所以如果需要在修改数据之后马上操作被该数据影响的视图DOM，需要把这个代码放到$netTick中

  nextTick(() => {
    handlePerviewImage();
  });
  function handlePerviewImage() {
    // 得到所有的img标签
    const imgs = articleContent.value.querySelectorAll("img");
    console.log(imgs);
    const imgPaths = []; //收集所有图片路径
    imgs.forEach((img, index) => {
      imgPaths.push(img.src);
      // 循环img列表，给img注册点击事件
      img.onclick = function () {
        // 在事件处理函数中调用ImagePreview 图片预览
        showImagePreview({
          images: imgPaths, //预览图片路径列表
          startPosition: index, //起始位置
        });
      };
    });
  }
});
async function onFollow() {
  isFollowLoading.value = true;
  const userId = store.state.article.aut_id;
  if (store.state.article.is_followed) {
    // 已关注，取消关注
    // console.log("取消关注");
    await deleteFollow(userId);
    // store.state.article.is_followed = false;
  } else {
    // 没有关注，添加关注
    // console.log("添加关注");
    await addFollow(userId);
    // store.state.article.is_followed = true;
  }
  store.state.article.is_followed = !store.state.article.is_followed;
  isFollowLoading.value = false;
}
async function onCollect() {
  isCollectLoading.value = true;

  if (store.state.article.is_collected) {
    // 已收藏，取消收藏
    // console.log("取消收藏");
    await deleteCollect(props.articleId);
  } else {
    // 没有收藏，添加收藏
    // console.log("添加收藏");
    await addCollect(props.articleId);
  }
  store.state.article.is_collected = !store.state.article.is_collected;
  isCollectLoading.value = false;
  showSuccessToast(`${store.state.article.is_collected ? "" : "取消"}收藏成功`);
}
async function onLike() {
  showLoadingToast({
    message: "加载中...",
    forbidClick: true, //禁止背景点击
  });

  if (store.state.article.attitude === 1) {
    // 已点赞，取消点赞
    // console.log("取消收藏");
    await deleteLike(props.articleId);
    store.state.article.attitude = -1;
  } else {
    // 没有点赞，添加点赞
    // console.log("添加收藏");
    await addLike(props.articleId);
    store.state.article.attitude = 1;
  }

  showSuccessToast(
    `${store.state.article.attitude === 1 ? "" : "取消"}点赞成功`
  );
}
function onPostSuccess(comment) {
  console.log(comment);
  // 把发布成功的评论数据对象放到评论列表顶部
  commentList.value.unshift(comment);
  // 更新评论的总数量
  totalCommentCount.value++;
  // 关闭发布评论弹出层
  isPostShow.value = false;
}
function onReplyClick(comment) {
  console.log("onReplyClick", comment);
  ReplyComment.value = comment;
  // 展示回复内容
  isReplyShow.value = true;
}
</script>

<style lang="less" scoped>
.article-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 100px;
  overflow-y: auto;
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
