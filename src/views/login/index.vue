<!-- 视图层: html -->
<template>
  <div class="login-container">
    <van-nav-bar class="app-nav-bar" title="登录" left-arrow @click-left="onClickLeft" />
    <!-- 可以使用 CellGroup 作为容器 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field v-model="user.mobile" name="mobile" icon-prefix="news" left-icon="shouji" placeholder="请输入手机号"
        :rules="userFormRules.mobile" type="number" maxlength="11" />
      <van-field v-model="user.code" name="code" icon-prefix="news" left-icon="yanzhengma" placeholder="请输入验证码"
        :rules="userFormRules.code" type="number" maxlength="6">
        <template #button>
          <van-count-down v-if="isCountDownShow" @finish="isCountDownShow = false" :time="time" format="ss s" />

          <van-button v-else @click="onSendSms" native-type="button" class="send-btn" size="small"
            round>发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button type="info" native-type="submit" block class="login-btn">登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<!-- 逻辑层：js -->
<script setup>
import { login, sendSms, getUserInfo } from "~/api/user";

import { reactive, ref } from "vue";
import {
  showLoadingToast,
  showSuccessToast,
  showFailToast,
  showToast,
} from "vant";
import "vant/es/toast/style";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
const onClickLeft = () => history.back();
const user = reactive({
  mobile: "",
  code: "",
});
const userFormRules = {
  mobile: [
    { required: true, message: "手机号不能为空" },
    { pattern: /1[3|5|7|8|9]\d{9}/, message: "手机号格式错误" },
  ],
  code: [
    { required: true, message: "验证码不能为空" },
    { pattern: /^\d{6}$/, message: "验证码格式错误" },
  ],
};
const loginForm = ref(null);
const time = ref(1000 * 10);
const isCountDownShow = ref(false);
async function onSubmit() {
  showLoadingToast({
    message: "登录中...",
    forbidClick: true, // 是否禁止背景点击
    duration: 0, // 持续展示 toast
  });
  try {
    // commit 和dispatch的区别在于commit是提交mutatious的同步操作，dispatch是分发actions的异步操作
    const { data } = await login(user).then((res) => {
      console.log(res);
    });

    store.commit("setUser", data.data);
    console.log(data.data);
    showSuccessToast("登陆成功");
    // router.push("/home");
  } catch (err) {
    showFailToast("登陆失败");
  }
}
async function onSendSms() {
  // 1. 校验手机号
  try {
    await loginForm.value.validate("mobile");
  } catch (err) {
    return console.log("验证失败", err);
  }
  // 2. 验证通过，显示倒计时
  isCountDownShow.value = true;
  // 3. 请求发送验证码
  try {
    await sendSms(user.mobile);
    showToast("发送成功");
  } catch (err) {
    // 发送失败，关闭倒计时
    isCountDownShow.value = false;
    if (err.response.status === 429) {
      showToast("发送太频繁了，请稍后重试");
    } else {
      showToast("发送失败，请稍后重试");
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .login-btn-wrap {
    padding: 37px 27px;

    .login-btn {
      background-color: rgb(197, 66, 34);
      color: #fff;
      border: none !important;
    }
  }

  .send-btn {
    background-color: #ededed;
    color: #666;
  }
}
</style>
