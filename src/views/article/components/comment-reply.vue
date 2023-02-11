<!-- 视图层: html -->
<template>
  <div class="comment-reply">
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <template #left>
        <van-icon name="cross" @click="$emit('close')"></van-icon>
      </template>
    </van-nav-bar>

    <!-- 当前评论项 -->
    <CommentItem :comment="comment"></CommentItem>
    <!-- 当前评论回复 -->
    <van-cell class="all" title="所有回复"></van-cell>
    <ArticleComment
      :list="commentList"
      :source="comment.com_id"
      type="c"
    ></ArticleComment>
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
    </div>
    <!-- 发布评论 -->
    <van-popup
      :style="{ height: '80%' }"
      v-model:show="isPostShow"
      position="bottom"
    >
      <PostComment
        :article-id="articleId"
        :target="comment.com_id"
        @post-success="onPostSuccess"
      ></PostComment>
    </van-popup>
  </div>
</template>
<!-- 逻辑层：js -->
<script setup>
import { ref } from "vue";
import CommentItem from "./comment-item.vue";
import ArticleComment from "./article-comment.vue";
import PostComment from "./post-comment.vue";
const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
  articleId: {
    type: [String, Number, Object],
    required: true,
  },
});
const isPostShow = ref(false);
const commentList = ref([]); //评论的回复列表
function onPostSuccess(comment) {
  // 将发布成功的评论放到评论列表的顶部
  commentList.value.unshift(comment);
  // 更新评论的回复数量
  comment.reply_count++;
  // 关闭发表回复的弹出层
  isPostShow.value = false;
}
</script>

<style lang="less" scoped>
.article-bottom {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background-color: #fff;
  border-top: 1px solid rgb(222, 217, 217);
  .comment-btn {
    width: 500px;
  }
}
</style>
