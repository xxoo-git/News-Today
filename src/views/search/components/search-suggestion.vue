<!-- 视图层: html -->
<template>
  <div class="search-suggestion">
    <van-cell
      @click="$emit('search', str)"
      v-for="(str, index) in suggestions"
      :key="index"
      icon="search"
    >
      <template #title>
        <div v-html="highlight(str)"></div>
      </template>
    </van-cell>
  </div>
</template>
<!-- 逻辑层：js -->
<script setup>
import { ref, watch } from "vue";
import { getSearchSuggestion } from "~/api/search.js";

const suggestions = ref([]);
const props = defineProps({
  searchText: {
    type: String,
    required: true,
  },
});
watch(
  () => props.searchText,
  // 一个返回响应式对象的 getter 函数，只有在返回不同的对象时，才会触发回调
  async () => {
    // 找到数据接口
    // 请求获取数据
    // 模板绑定展示
    const { data } = await getSearchSuggestion(props.searchText);
    // console.log(data);
    suggestions.value = data.data.options;
  },

  { immediate: true } // 该回调将会在侦听开始之后被立即调用
);
function highlight(str) {
  // console.log(str);
  // RegExp是正则表达式的构造函数
  // 参数1：字符串
  // 参数2：匹配模式
  // 参数3：正则对象
  return str.replace(
    new RegExp(props.searchText, "gi"),
    `<span style="color:red">${props.searchText}</span>`
  );
}
</script>

<style lang="less" scoped>
</style>
