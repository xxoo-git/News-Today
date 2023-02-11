<!-- 视图层 -->
<template>
  <div class="content">
    <div class="top">
      <div class="topmost" v-for="(item, index) in topmost" key="index">
        <div>{{ item.title }}</div>
        <div class="text">
          <span>置顶</span>
          <span>{{ item.name }}</span>
          <span>{{ item.comment }}</span>
          <span>{{ item.time }}</span>
        </div>
      </div>
    </div>
    <div class="list" v-for="(item, index) in list" key="index">
      <div class="title">
        <div class="title_top">
          {{ item.title }}
        </div>
        <div class="title_con">
          <span>{{ item.name }}</span>
          <span>{{ item.comment }}</span>
          <span>{{ item.time }}</span>
        </div>
      </div>
      <div class="img">
        <img src="" alt="" />
      </div>
    </div>

    <div class="article">
      <div class="ar_top">
        <div class="ar_left">
          <div class="img"></div>
          <div>
            <div>优雅列车员</div>
            <div class="text">昨天</div>
          </div>
        </div>
        <div class="click">关注</div>
      </div>
      <div class="ar_text">
        <span>#武林外传的台词是真厉害#</span>
        <span
          >多少年过去了, 武林外传台词依旧不落后，多少年过去武林外
          传台词依不落后666
        </span>
      </div>
      <div class="ar_con">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="ar_ico">
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
        <div>....</div>
      </div>
    </div>
  </div>
</template>

<!-- 逻辑层 -->
<script setup>
import { ref } from "vue";
const topmost = ref([
  {
    title: "置顶新闻1:控制在单行标题，最多允许双行",
    name: "小木屋",
    comment: "2.7万评论",
    time: "3小时前",
  },
  {
    title: "置顶新闻2:控制在单行标题，最多允许双行",
    name: "小木屋1",
    comment: "3.0万评论",
    time: "3小时前",
  },
]);
const list = ref([
  {
    title: "带缩略图的新闻标题2，最多显示三行，超出长度截取为省略号",
    name: "东风不破",
    comment: "27评论",
    time: "3小时前",
  },
  {
    title: "带缩略图的新闻标题1，最多显示三行，超出长度截取为省略号",
    name: "东风不破",
    comment: "27评论",
    time: "3小时前",
  },
]);
</script>

<!-- 样式层 -->
<style lang="less" scoped>
.content {
  background-color: rgb(223, 220, 220);
  padding-top: 10px;

  .top {
    border-radius: 20px;
    background-color: #fff;
    margin: 20px;
    padding: 20px 40px;
  }

  .topmost {
    font-size: 30px;
    margin-top: 20px;

    .text {
      font-size: 20px;
      margin-top: 20px;

      span {
        margin-left: 20px;
      }

      span:nth-child(1) {
        color: red;
        margin-left: 0;
      }
    }
  }
}

.list {
  display: flex;
  justify-content: space-between;
  margin: 20px;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 20px;

  .title {
    font-size: 16px;

    .title_top {
      font-size: 30px;
    }

    .title_con {
      margin-top: 20px;
      color: rgb(193, 191, 191);

      span {
        margin-left: 20px;
      }

      span:nth-child(1) {
        margin-left: 0;
      }
    }
  }

  .img {
    width: 80%;
    margin-left: 20px;
    background-color: rgb(118, 113, 113);
    border-radius: 20px;
  }
}

.article {
  background-color: #fff;
  border-radius: 20px;
  font-size: 30px;
  margin: 20px;
  padding: 20px 40px;

  .ar_ico {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .ar_icos {
      display: flex;
      justify-content: space-between;
      div {
        margin-left: 25px;
      }
    }
  }

  .ar_text {
    margin-top: 20px;

    span:nth-child(1) {
      color: rgb(134, 134, 230);
    }
  }

  .ar_con {
    display: flex;
    justify-content: space-around;
    margin-top: 40px;

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