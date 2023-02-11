<!-- 视图层: html -->
<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <template #title>
        <div class="title">我的频道</div>
      </template>
      <van-button @click="isEdit = !isEdit" type="danger" plain size="mini">{{
        isEdit ? "完成" : "编辑"
      }}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="clear">
      <van-grid-item
        class="grid-item"
        :class="{ active: index === props.active }"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        v-for="(channel, index) in props.userChannel"
        :key="index"
        :text="channel.name"
        @click="onUserChannelClick(channel, index)"
      />
    </van-grid>
    <van-cell center :border="false">
      <template #title>
        <div class="title">频道推荐</div>
      </template>
    </van-cell>
    <van-grid :gutter="10" direction="horizontal" icon-size="5px">
      <van-grid-item
        v-for="(channel, index) in recommendChannels"
        :key="index"
        class="grid-item"
        :text="channel.name"
        icon="plus"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>
<!-- 逻辑层：js -->
<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { setItem } from "~/utils/storage.js";
import { addUserChannel, deleteUserChannel } from "~/api/channel.js";
import { showToast } from "vant";
import "vant/es/toast/style";
const isEdit = ref(false); //控制编辑显示状态
const store = useStore();
const emit = defineEmits(["close", "update-active"]);
const props = defineProps({
  userChannel: {
    type: Array,
    required: true,
  },
  active: {
    type: Number,
    required: true,
  },
});
// 计算属性会观测内部依赖数据的变化而变化
const recommendChannels = computed(() => {
  // 所有频道列表-我的频道=剩余推荐频道
  // filter方法：过滤数据，根据方法返回的布尔值true来收集数据
  // filter方法查找满足条件的所有元素
  return store.state.allChannels.filter((channel) => {
    // 判断channel是否属于用户频道
    // find方法查找满足条件的单个元素
    return !store.state.channels.find((userChannel) => {
      // 找到满足该条件的元素
      return userChannel.id === channel.id;
    });
  });
});
store.dispatch("getAllChnels");
async function onAdd(channel) {
  try {
    // console.log(channel);
    store.state.channels.push(channel);
    // 数据持久化
    if (store.state.user) {
      // 登录了，数据存储到线上
      await addUserChannel({
        channels: [
          {
            id: channel.id,
            seq: store.state.channels.length,
          },
        ],
      });
    } else {
      // 没有登录，数据存储到本地
      setItem("user-channels", store.state.channels);
    }
  } catch (err) {
    console.log(err);
    showToast("添加频道失败");
  }
}
function onUserChannelClick(channel, index) {
  if (isEdit.value && index !== 0) {
    // 编辑状态，删除频道
    deleteChannel(channel, index);
  } else {
    // 非编辑状态，切换频道
    switchChannel(index);
  }

  async function deleteChannel(channel, index) {
    console.log("删除频道");
    // 如果删除的是当前激活频道之前的频道
    if (index <= props.active) {
      // 更新激活频道的索引
      emit("update-active", props.active - 1);
    }
    store.state.channels.splice(index, 1);
    // 数据持久化
    if (store.state.user) {
      // 登录了，数据存储到线上
      await deleteUserChannel(channel.id);
    } else {
      // 没有登录，数据存储到本地
      setItem("user-channels", store.state.channels);
    }
  }
  function switchChannel(index) {
    console.log("切换频道");
    //传递给父组件
    emit("update-active", index); // 切换频道
    emit("close"); //关闭弹出层
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 94px;
  .title {
    font-size: 30px;
    color: #333;
  }
  .grid-item {
    height: 103px;
  }
  /deep/ .van-grid-item__content {
    background-color: #f4f5f6;
    .van-grid-item__text {
      font-size: 30px;
      color: #222;
      margin-top: 0;
    }
  }
  .clear {
    /deep/ .van-grid-item__icon {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 45px;
      color: #ccc;
    }
  }
  .active {
    /deep/ .van-grid-item__text {
      color: #f00;
    }
  }
}
</style>
