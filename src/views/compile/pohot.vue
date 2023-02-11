<!-- 视图层 -->
<template>
    <!-- <img :src="image" alt=""> -->
    <img :src="imgs.file" alt="" class="img">
    <van-nav-bar class="tooble" left-text="取消" right-text="确定" @click-left="$emit('close')"
        @click-right="onConfirm"></van-nav-bar>
</template>

<!-- 逻辑层 -->
<script setup>
import { ref } from 'vue'
import { patchUserPhoto } from '~/api/user.js'
const imgs = ref({
    file: 'https://lmg.jj20.com/up/allimg/1114/040221103339/210402103339-8-1200.jpg',
    type: Object
})
const onConfirm = () => {
    patchUserPhoto().then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    })
}

// const fileList = ref()
// const props = defineProps({
//     image: {
//     type: String,
//     required: true,
//   },
// });
// const btn = () => {
//     console.log(props.image);
// }
</script>

<!-- 样式层 -->
<style lang="less" scoped>
.tooble {
    position: fixed;
    bottom: 0;
    width: 100%;
}

.img {
    width: 100%;
}
</style>