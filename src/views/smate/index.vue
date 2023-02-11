<!-- 视图层 -->
<template>
    <van-nav-bar class="app-nav-bar" :title="articleId" left-arrow @click-left="$router.back()" />
    <!-- 消息列表 -->
    <van-cell-group class="content" ref="foot">
        <!-- <van-cell v-for="item in meArr" :title="item.name" :value="item.msg" ref="sc_list" /> -->
        <van-cell center class="user-info" v-for="item in meArr">
            <div class="" v-if="item.text == 'text'">
                <div class="ico_img">
                    <van-image v-if="item.text == 'text'" fit="cover" round class="avatar" :src="item.photo" />
                    <div class="text">{{ item.msg }}</div>
                </div>
            </div>
            <div class="" v-else>
                <div class="ico_imgs">
                    <van-image fit="cover" round class="avatar"
                        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                    <div class="text">{{ item.msg }}</div>
                </div>
            </div>
        </van-cell>
    </van-cell-group>

    <!-- 底部 -->
    <van-cell-group inset class="foot">
        <van-field v-model="me" center label="内容" placeholder="请输入内容">
            <template #button>
                <van-button size="small" type="primary" @click="onSend">发送</van-button>
            </template>
        </van-field>
    </van-cell-group>

  <!-- 底部 -->
  <van-cell-group inset class="foot">
    <van-field v-model="me" center label="内容" placeholder="请输入内容">
      <template #button>
        <van-button size="small" type="primary" @click="onSend"
          >发送</van-button
        >
      </template>
    </van-field>
  </van-cell-group>
</template>

<!-- 逻辑层 -->
<script setup>
import io from 'socket.io-client';
import { ref, reactive } from 'vue'
import { useStore } from "vuex";
const store = useStore();
if (store.state.user) {
  store.dispatch("getInfo");
}
const props = defineProps({
    articleId: {
        type: [String, Number, Object],
        required: true,
    },
});

// 小智同学建立连接
const socket = io("http://toutiao.itheima.net", {
  query: {
    token: store.state.user,
  },
  transports: ["websocket"],
});
//小智同学连接成功
socket.on("connect", function () {
  console.log("连接成功");
});

//发送消息
const me = ref();
const meArr = reactive([]);

const onSend = () => {
  socket.emit("message", {
    msg: me.value,
    timestamp: Date.now(),
  });
  meArr.push({
    photo: store.state.userInfo.photo,
    msg: me.value,
    timestamp: Date.now(),
    text: "text",
  });
  me.value = "";
  console.log(meArr);
};
//接受消息
socket.on("message", function (data) {
  console.log(data);
  meArr.push(data);
  console.log(meArr);
});

// window.socket = socket
// 小智同学连接断开
socket.on("disconnect", function () {
  console.log("连接断开");
});
//发送消息
// socket.emit('消息类型',消息内容)
// socket.on('消息类型', function (data) { data消息内容});
// function foot() {
//     const list = ref['sc_list'];
//     list.scrollTop = list.scrollHeight
// }

//滑动底部
const foot = ref(null);
</script>

<!-- 样式层 -->
<style lang="less" scoped>
.user-info {
    border: none;
    margin-top: -2px;
    background-color: rgb(247, 247, 247);

}

.ico_img {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;

    .avatar {
        width: 85px;
        height: 85px;
        margin-right: 15px;
    }

    .text {
        margin-right: 20px;
        border-radius: 20px;
        padding: 10px 20px;
        color: #999;
        background-color: rgb(224, 239, 251);
    }
}

.ico_imgs {
    display: flex;
    align-items: center;
    flex-direction: row;

    .avatar {
        width: 85px;
        height: 85px;
        margin-right: 15px;
    }

    .text {
        margin-right: 20px;
        border-radius: 20px;
        padding: 10px 20px;
        color: #999;
        background-color: rgb(224, 239, 251);
    }
}

.content {
  padding-top: 90px;
}

.foot {
  position: fixed;
  bottom: 0;
}

.app-nav-bar {
  position: fixed;
  width: 100%;
}
</style>