<!-- 视图层: html -->
<template>
  <div class="article-list">
    <van-pull-refresh
      :success-text="refreshSuccessText"
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-duration="1500"
    >
      <van-list
        v-model:loading="loading"
        v-model:error="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        ></ArticleItem>
        <!-- <van-cell
          v-for="(item, index) in articles"
          :key="index"
          :title="item.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<!-- 逻辑层：js -->
<script setup>
import ArticleItem from "~/components/article-item/index.vue";
import { getArticles } from "~/api/article.js";
import { ref } from "vue";
import { showToast } from "vant";
import "vant/es/toast/style";
const props = defineProps({
  channel: {
    type: Object,
    required: true,
  },
});
const articles = ref([]);
const loading = ref(false);
const error = ref(false);
const finished = ref(false);
const timestamp = ref(null); //获取下一页的时间戳
const isRefreshLoading = ref(false); //下拉刷新
const refreshSuccessText = ref(null); //下拉刷新提示文本
async function onLoad() {
  try {
    // 1.请求获取数据
    const { data } = await getArticles({
      channel_id: props.channel.id, //频道id
      timestamp: timestamp.value || Date.now(), //时间戳，请求新的推荐数据传当前的时间戳，请求历史推送传指定的时间戳
      with_top: 1, //是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
    });
    // console.log(data);
    // 2.把数据放到list数组中
    const { results } = data.data;
    articles.value.push(...results); //es6展开运算符
    // 3.设置本次加载状态结束，它才可以判断是否需要加载下一次，否则就会永远的停在这里
    loading.value = false;
    
    // 4.数据全部加载完成
    if (results.length) {
      // 更新获取下一页数据的页码
      timestamp.value = data.data.pre_timestamp;
    } else {
      // 没有数据了，把加载状态设置结束，不再触发加载更多
      finished.value = true;
    }
  } catch (err) {
    loading.value = false;
    error.value = true;
  }
}
async function onRefresh() {
  try {
    // 下拉刷新，组件自己就会展示loading状态
    // 1.请求获取数据
    const { data } = await getArticles({
      channel_id: props.channel.id, //频道id
      timestamp: Date.now(), //时间戳，请求新的推荐数据传当前的时间戳，请求历史推送传指定的时间戳
      with_top: 1, //是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
    });
    // 2.把数据放到数据列表中（往顶部追加）
    const { results } = data.data;
    articles.value.unshift(...results);
    // 3.关闭刷新的状态loading
    isRefreshLoading.value = false;
    refreshSuccessText.value = `更新了${results.length}条数据`;
  } catch (err) {
    isRefreshLoading.value = false;
    showToast("刷新失败");
  }
}
</script>

<style lang="less" scoped>
.article-list {
  margin-bottom: 100px;
}
</style>
