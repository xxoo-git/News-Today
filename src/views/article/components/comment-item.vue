<!-- 视图层: html -->
<template>
  <van-cell class="comment-item">
    <template #icon>
      <van-image round fit="cover" class="avatar" :src="comment.aut_photo" />
    </template>
    <template #title>
      <div class="title-wrap">
        <div class="name">{{ comment.aut_name }}</div>
        <div
          :loading="isCommentLikeLoading"
          @click="onCommentLike"
          class="like-wrap"
        >
          <van-icon
            class="like-icon"
            :class="{
              liked: comment.is_liking,
            }"
            :name="comment.is_liking ? 'good-job' : 'good-job-o'"
          ></van-icon>
          <span class="like-count">{{ comment.like_count }}</span>
        </div>
      </div>

      <div class="content">{{ comment.content }}</div>
      <div class="reply-wrap">
        <span class="pubdate">{{ $filters.format(comment.pubdate) }}</span>
        <van-button
          v-if="type !== 'c'"
          @click="$emit('reply-click', comment)"
          class="reply-btn"
          round
          size="mini"
          >{{ comment.reply_count }} 回复</van-button
        >
      </div>
    </template>
  </van-cell>
</template>
  

<!-- 逻辑层：js -->
<script setup>
import { inject, ref } from "vue";
import { addCommentLike, deleteCommentLike } from "~/api/comment.js";
const isCommentLikeLoading = ref(false); //收藏按钮的loading状态

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    default: "c",
  },
});
async function onCommentLike() {
  isCommentLikeLoading.value = true;

  const commentId = props.comment.com_id;
  if (props.comment.is_liking) {
    // 已点赞，取消点赞
    await deleteCommentLike(commentId);
    props.comment.like_count--;
  } else {
    // 没有点赞，添加点赞
    await addCommentLike(commentId);
    props.comment.like_count++;
  }
  // 更新视图
  props.comment.is_liking = !props.comment.is_liking;
  isCommentLikeLoading.value = false;
}
</script>

<style lang="less" scoped>
.comment-item {
  .avatar {
    width: 90px;
    height: 90px;
    margin-right: 13px;
  }
  .name {
    font-size: 14px;
    color: #406599;
  }
  .content {
    font-size: 16px;
    color: #222;
  }
  .pubdate {
    font-size: 10px;
    margin-right: 13px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
  }
  .like-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .like-icon.liked {
    color: #ff69b4;
  }
  .reply-wrap {
    display: flex;
    align-items: center;
  }
}
</style>
