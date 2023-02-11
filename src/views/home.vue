<!-- 视图层: html -->
<template>
  <div class="search">
    <van-search
      to="/search"
      fixed
      disabled
      background="rgb(197, 66, 34)"
      show-action
      shape="round"
      placeholder="请输入搜索关键词"
    >
      <template #action>
        <div class="seachico">
          <van-icon name="add-o" />
        </div>
      </template>
    </van-search>
  </div>
  <van-tabs
    v-model:active="active"
    animated="true"
    swipeable="true"
    title-active-color="rgb(197, 66, 34)"
    color="rgb(197, 66, 34)"
    class="channel-tabs"
    sticky
    offset-top="46px"
  >
    <van-tab
      v-for="channel in $store.state.channels"
      :key="channel.id"
      :title="channel.name"
    >
      <ArticleList :channel="channel"></ArticleList>
    </van-tab>

    <template #nav-right>
      <i class="placeholder"></i>
      <van-icon
        @click="isChannelEditShow = true"
        name="wap-nav"
        size="20"
        class="hamburger-btn"
      ></van-icon>
    </template>
  </van-tabs>
  <!-- 底部弹出 -->
  <van-popup
    v-model:show="isChannelEditShow"
    position="bottom"
    closeable
    close-icon-position="top-left"
    :style="{ height: '100%' }"
    teleport="body"
    z-index="9999"
    class="channel-edit-popup"
  >
    <ChannelEdit
      :active="active"
      @close="isChannelEditShow = false"
      @update-active="onUpdateActive"
      :userChannel="$store.state.channels"
    ></ChannelEdit>
  </van-popup>
</template>
<!-- 逻辑层：js -->
<script setup>
import ArticleList from "~/components/home/article-list.vue";
import ChannelEdit from "~/components/home/channel-edit.vue";

import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const active = ref(0);
const isChannelEditShow = ref(false); //控制弹出层是否展示
store.dispatch("getChannels");
function onUpdateActive(index) {
  // console.log(index);
  active.value = index;
}
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  transform: none;
  position: fixed;
  z-index: 999;
}
.seachico {
  color: white;
  font-size: 50px;
}
.channel-tabs .hamburger-btn {
  /* 固定定位 */
  position: fixed;
  /* 最右侧 */
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 80px;
  background-color: #fff;
  /* 设置透明度 */
  opacity: 0.902;
}

.channel-tabs .placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 80px;
}
/deep/ .van-tabs__line {
  width: 40px !important;
  height: 6px !important;
}
/* tab内容距离tab导航的距离 */
/deep/ .van-tabs__content {
  padding-top: 105px;
}
</style>
