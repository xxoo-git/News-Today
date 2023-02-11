<!-- 视图层: html -->
<template>
      <div class="content">
          <div class="top"></div>
          <div class="list">
              <div class="index">1</div>
              <div class="text">
                <div>是否就地过年要分类分区考虑，要分类分区考虑</div>
                <div >
                  <span>2170阅读</span>
                  <span>陌陌网</span>
                </div>
              </div>
              <div class="img"></div>
          </div>
      </div>
</template>
<!-- 逻辑层：js -->
<script setup>
</script>

<style lang="less" scoped>
.content{
  font-size: 32px;
  margin-top: 20px;
  background-color: #fff;
  margin-left: 30px;
  margin-right: 30px;
  padding: 30px;
  border-radius:20px;
  .list{
    display: flex;
    
    .index{
      width: 10%;
      color: red;
    }
    .text{
      div:nth-child(2){
        font-size: 20px;
        margin-top: 20px;
      }
      span:nth-child(2){
        margin-left: 20px;
        
      }
    }
    .img{
      width: 40%;
      background-color: rgb(203, 201, 198);
    }
  }
}
</style>
