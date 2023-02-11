<!-- 视图层 -->
<template>
    <van-nav-bar class="app-nav-bar" title="资料编辑" left-arrow @click-left="$router.back()" />


    <input type="file" hidden ref="file" accept="image/*" @change="imgChang">
    <van-cell title="头像" is-link center @click="$refs.file.click()">
        <van-image round class="avatar" fit="cover" :src="$store.state.userProfile.photo" />
    </van-cell>


    <van-cell title="昵称" is-link :value="$store.state.userProfile.name" to="/name" />

    <van-cell title="性别" is-link v-if="$store.state.userProfile.gender == 1" value="女" @click="showPicker = true" />
    <van-cell title="性别" is-link v-else value="男" @click="showPicker = true" />


    <!-- //修改性别 -->
    <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onCn" />
    </van-popup>



    <!-- //修改头像 -->
    <van-popup v-model:show="img" position="bottom" style="height:100%">
        <pohot :image="img_ico" @close="img = false"></pohot>
    </van-popup>



    <van-cell title="生日" is-link :value="$store.state.userProfile.birthday" @click="onDisplay" />
    <van-calendar :show="show" @close="onClose" @confirm="onConfirm" />







</template>

<!-- 逻辑层 -->
<script setup>
import pohot from './pohot.vue'
import { useStore } from "vuex";
import { ref, } from "vue";
import { postUserProfile } from '~/api/user.js'
import {
    showLoadingToast,
    showSuccessToast,
    showFailToast,
    showToast,
} from "vant";
const store = useStore();
const user = ref([]);
if (store.state.user) {
    store.dispatch("getUserPro");
}
const show = ref(false);
const date = ref();
//图片修改
const file = ref(null);
const img_ico = ref()
const img = ref(false)
const imgChang = () => {
    img.value = true;
    img_ico.value = file.value.value
    console.log(img_ico.value);
    file.value.value = ''
}

//修改性别
const sex = ref();
const columns = [
    { text: '男', value: '1' },
    { text: '女', value: '2' },
];
const showPicker = ref(false);
const onCn = ({ selectedOptions }) => {
    showPicker.value = false;

    sex.value = selectedOptions[0].text;
    if (sex.value == '男') {
        postUserProfile('', '', 0).then((res) => {
            showSuccessToast("修改成功");
            location.reload();
        })
    } else {
        postUserProfile('', '', 1).then((res) => {
            showSuccessToast("修改成功");
            location.reload();
        })
    }

};
// const onCn = (e) => {

//     console.log(e);
// }
//修改生日
const onDisplay = () => {
    show.value = true
}
const formatDate = (date) => {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
const onConfirm = (event) => {
    show.value = false;
    console.log(formatDate(event));
    date.value = formatDate(event)
    postUserProfile(date.value).then((res) => {
        showSuccessToast("修改成功");
        location.reload();
    })
}
const onClose = () => {
    show.value = false
}






</script>

<!-- 样式层 -->
<style lang="less" scoped>
.avatar {
    width: 82px;
    height: 82px;
    margin-right: 23px;
    margin-top: 10px;
    border: 1px solid #fff;
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    width: 520px;
    height: 320px;
    background-color: #fff;
}

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