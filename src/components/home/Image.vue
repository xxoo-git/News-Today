<!-- 视图层: html -->
<template>
  <div class="image-container">
    <div>
      <img src="../../assets/images/a3.jpg" style="width: 100%" />
    </div>
    <div class="van-multi-ellipsis--l2 title">
      这是一段最多显示两行的文字，多余的内容会被省略
    </div>
    <div class="info">
      <div class="text">
        <span>小默资讯</span>
        <span>2.7万评论</span>
        <span>3小时前</span>
      </div>
      <div>
        <span class="iconfont icon-weibiaoti5"></span>
      </div>
    </div>
  </div>
</template>
<!-- 逻辑层：js -->
<script setup>
</script>

<style lang="less" scoped>
.image-container {
  background-color: #fff;
  border-radius: 20px;
  margin: 20px;
  padding: 20px 35px;
  .title {
    font-size: 30px;
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    .text {
      span {
        font-size: 22px;
        color: rgb(153, 153, 153);
      }
    }
    .icon-weibiaoti5 {
      font-size: 35px;
      color: rgb(153, 153, 153);
    }
  }
}
</style>
