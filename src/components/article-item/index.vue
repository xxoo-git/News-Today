<!-- 视图层: html -->
<template>
  <van-cell
    class="article-item"
    :to="{
      name: 'article',
      params: {
        articleId: article.art_id,
      },
    }"
  >
    <template #title>
      <span class="title van-ellipsis">{{ article.title }}</span>
    </template>
    <template #label>
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-wrap-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image fit="cover" :src="img" class="cover-item" />
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ $filters.format(article.pubdate) }}</span>
      </div>
    </template>
    <template #default v-if="article.cover.type === 1">
      <van-image
        class="right-cover"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </template>
  </van-cell>
</template>
<!-- 逻辑层：js -->
<script setup>
const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="less" scoped>
.article-item {
  /deep/ .title {
    display: inline-block;
    width: 409px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/ .van-cell__value {
    flex: unset !important;
    width: 256px;
    height: 161px;
    margin-left: 12px;
  }
  .right-cover {
    width: 246px;
    height: 154px;
  }
  .cover-wrap {
    padding: 15px 0;
    display: flex;
    flex-wrap: nowrap;
    .cover-wrap-item {
      flex: 1;
      height: 154px;
      &:not(:last-child) {
        padding-right: 15px;
      }
      .cover-item {
        width: 100%;
        height: 154px;
      }
    }
  }
  .label-wrap {
    width: 409px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 60px;
    span {
      margin-right: 10px;
    }
  }
}
</style>
