<!-- 视图层 -->
<template>
    <!-- <van-nav-bar class="app-nav-bar" title="" left-arrow @click-left="$router.back()" /> -->
    <van-nav-bar title="昵称" left-text="返回" right-text="确定" left-arrow @click-left="$router.back()"
        @click-right="btn" />
    <div class="con">
        <van-cell-group inset>
            <van-field v-model="val" rows="2" autosize  type="textarea" maxlength="8" placeholder="请输入昵称" show-word-limit />
        </van-cell-group>

        <!-- <van-cell-group>
            <van-cell-group>
                <van-field v-model="val" placeholder="请输入用户名" :rules="user.name" maxlength="8" />
            </van-cell-group>
        </van-cell-group> -->
    </div>
</template>

<!-- 逻辑层 -->
<script setup>
import { useStore } from "vuex";
import { ref } from 'vue'
import { postUserProfile } from '~/api/user.js'
import {
    showLoadingToast,
    showSuccessToast,
    showFailToast,
    showToast,
} from "vant";
import router from "../../router";

// 修改昵称
const val = ref();
const store = useStore();
const btn = () => {
    console.log(val.value);
    postUserProfile('', val.value).then((res) => {
        showSuccessToast("修改成功");
        router.push("/me");
    })
}

const user = {
    name: [
        { required: true, message: "验证码不能为空" },
        { pattern: /^\d{6}$/, message: "验证码格式错误" },]
}
</script>

<!-- 样式层 -->
<style lang="less" scoped>
.con{
    margin-top: 50px;
}
</style>