<!-- 视图层: html -->
<template>
  <div class="article">
    <div class="ar_top">
      <div class="ar_left">
        <div class="img"></div>
        <div>
          <div>东方不破</div>
          <div class="text">3小时前</div>
        </div>
      </div>
      <div><i
          class="iconfont icon-weibiaoti5"
          style="font-size: 20px; color: rgb(153, 153, 153)"
        ></i></div>
    </div>
    <div class="ar_text">
      <div>
        <span>#武林外传的台词是真厉害#</span>
        <span>多少年过去了,
          武林外传台词依旧不落后，多少年过去武林外
          传台词依不落后666
        </span>
      </div>
      <div class="img">

      </div>
    </div>
    <div class="ar_icos">
      <div>
        <van-icon name="share-o" />
        <span>分享</span>
      </div>
      <div>
        <van-icon name="comment-o" />
        <span>568</span>
      </div>
      <div>
        <van-icon name="revoke" />
        <span>658</span>
      </div>
    </div>
  </div>
</template>
<!-- 逻辑层：js -->
<script setup>
</script>

<style lang="less" scoped>
.article {
  background-color: #fff;
  border-radius: 20px;
  font-size: 30px;
  margin: 20px;
  padding: 20px 40px;

  .ar_icos {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    div {
      margin-left: 25px;
    }

  }

  .ar_text {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    span:nth-child(1) {
      color: rgb(134, 134, 230);
    }

    .img {
      width: 600px;
      margin-left: 30px;
      background-color: rgb(150, 144, 144);
    }
  }

  .ar_con {
    

    div {
      width: 200px;
      height: 200px;
      background-color: rgb(172, 166, 166);
      border-radius: 20px;
    }

  }

  .ar_top {
    display: flex;
    justify-content: space-between;
    align-content: center;

    .ar_left {
      display: flex;
      justify-content: space-between;
    }

    .text {
      font-size: 16px;
      margin-top: 10px;
      color: rgb(213, 210, 210);
    }

    .img {
      width: 80px;
      border-radius: 50%;
      margin-right: 20px;
      background-color: rgb(169, 167, 167);
    }

    .click {
      border: 1px solid rgb(168, 164, 164);
      border-radius: 20px;
      height: 40px;
      width: 100px;
      text-align: center;
      margin-top: 18px;
    }
  }
}
</style>
