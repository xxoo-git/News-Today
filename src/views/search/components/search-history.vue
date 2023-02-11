<!-- 视图层: html -->
<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('update-histories', [])">全部删除</span>
        <span @click="isDeleteShow = false" class="finish">完成</span>
      </div>
      <van-icon @click="isDeleteShow = true" v-else name="delete"></van-icon>
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history, index) in props.searchHistories"
      :key="index"
      @click="onDelete(history, index)"
    >
      <van-icon v-show="isDeleteShow" name="close"></van-icon>
    </van-cell>
  </div>
</template>
<!-- 逻辑层：js -->
<script setup>
import { ref } from "vue";
import { setItem } from "~/utils/storage.js";
const emit = defineEmits(["search", "update-histories"]);
const isDeleteShow = ref(false); //删除的显示状态
const props = defineProps({
  searchHistories: {
    type: Array,
    required: true,
  },
});
function onDelete(history, index) {
  // console.log(index);
  if (isDeleteShow.value) {
    props.searchHistories.splice(index, 1);
    // 持久化处理
    // 1.修改本地存储的数据
    // 2.请求接口删除线上的数据
    setItem("search-histories", props.searchHistories);
    return;
  }
  // 非删除状态，展示搜索结果
  emit("search", history);
}
</script>

<style lang="less" scoped>
.search-history {
  .finish {
    margin-left: 20px;
  }
}
</style>
