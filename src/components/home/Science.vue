<!-- 视图层: html -->
<template>
  <div class="science-container">
    <div class="science-top">
      <!-- 最多显示两行 -->
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
    <div class="two-science">
      <div class="two-left">
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
      <div class="two-right">
        <img src="../../assets/images/a2.jfif" alt="" />
      </div>
    </div>
    <div class="three-science">
      <div class="van-multi-ellipsis--l2 title">
        这是一段最多显示两行的文字，多余的内容会被省略
      </div>
      <div>
        <img src="../../assets/images/a1.jpg" style="width: 100%" />
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
  </div>
</template>
<!-- 逻辑层：js -->
<script setup>
</script>

<style lang="less" scoped>
.science-container {
  .science-top {
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

  .two-science {
    background-color: #fff;
    border-radius: 20px;
    margin: 20px;
    padding: 20px 35px;
    display: flex;
    justify-content: space-between;

    .two-left {
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
          margin-right: 15px;
        }
      }
    }
    .two-right img {
      width: 250px;
      border-radius: 3px;
      object-fit: cover;
      object-position: center center;
    }
  }
  .three-science {
    background-color: #fff;
    border-radius: 20px;
    margin: 20px;
    padding: 20px 35px;
    .title {
      font-size: 30px;
      margin-bottom: 15px;
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
        margin-right: 15px;
      }
    }
  }
}
</style>
