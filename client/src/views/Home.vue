<template>
  <div class="background-container-t">
    <!-- 内容 -->

    <!-- <div class="back">
      <n-button quaternary class="n-btu" @click="gotoHomePage">
        后台登录
      </n-button>
    </div> -->
    <!-- 窗口 -->
    <!-- <div class="window">
      <div class="window-font">Yang's blog</div>
      <div class="mask"></div>
    </div> -->
    <!-- 添加遮罩层 -->
    <!-- <div class="overlay"></div> -->

    <div class="header">
      <span class="header-text" @click="gotoLogin">后台登录</span>
      <span class="header-text" @click="gotoHomePage">学习记录</span>
      <span class="header-text">学习资料</span>
    </div>
    <div class="window">
      <div class="window-font">Yang's blog</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from "vue";
// 引入路由
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
// 注入
const axios = inject("axios");
const message = inject("message");
const dialog = inject("dialog");
// -------------------------------------------------------------------
const gotoLogin = () => {
  router.push("/login");
};
const gotoHomePage = () => {
  router.push("/homePage");
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "SpicyChips"; /* 修改字体名称 */
  src: url("@/assets/Spicy_Chips.ttf") format("truetype");
}
.header-text {
  top: 50%;
  cursor: pointer;
  transform: translate(0, -50%);
  font-weight: 800;
}

.background-container-t {
  // position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/buou.jpg");
  background-size: cover;
  background-position: center;
  z-index: -1;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // .window {
  //   transform: translate(0, -50%);
  //   .window-font {
  //     font-size: 130px;
  //     font-family: "SpicyChips", sans-serif; /* 使用正确的字体名称 */
  //     color: rgba(255, 255, 255, 0.8);
  //     // position: absolute;
  //     // top: 20%;
  //     // left: 35%;
  //   }
  //   // .search-container {
  //   //   // background-color: #ffffff;
  //   //   padding: 20px;
  //   //   border-radius: 50px;
  //   //   // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  //   //   display: flex;
  //   //   align-items: center;
  //   //   width: 400px;
  //   //   // top: 10%;
  //   //   left: 12%;
  //   //   position: relative;
  //   //   .search-input {
  //   //     flex: 1;
  //   //     border: none;
  //   //     padding: 0px;
  //   //     font-size: 16px;
  //   //     border-radius: 50px;
  //   //     height: 35px;
  //   //   }

  //   //   .search-button {
  //   //     background-color: #3498db;
  //   //     color: #ffffff;
  //   //     border: none;
  //   //     padding: 0 auto;
  //   //     border-radius: 50px;
  //   //     height: 35px;
  //   //     width: 80px;
  //   //     cursor: pointer;
  //   //     transition: background-color 0.2s;
  //   //     position: absolute;
  //   //     left: 77.2%;
  //   //   }

  //   //   .search-button:hover {
  //   //     background-color: #2980b9;
  //   //   }
  //   // }
  // }
  // .back {
  //   // left: 95%;
  //   // position: absolute;
  //   align-self: flex-start;
  //   transform: translate(1200px, 0);
  //   font-size: 20px;
  //   font-family: "SpicyChips", sans-serif; /* 使用正确的字体名称 */
  //   color: rgba(255, 255, 255, 0.8);
  //   font-weight: bolder;
  //   .n-btu {
  //     color: rgba(255, 255, 255, 0.8);
  //   }
  // }
  // .overlay {
  //   position: absolute;
  //   bottom: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 45%; /* 高度设置为页面的 1/4 */
  //   background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  //   // z-index: -1; /* 将遮罩放在页面最底层 */
  // }
  .header {
    // background-color: #fff;
    width: 100%;
    height: 15%;
    position: sticky;
    top: 0;
    font-size: 1.55rem;
    font-family: "sourcehansans";
    color: #f0f0f0;

    //     font-family: "SpicyChips", sans-serif;

    // display: flex;
    span:nth-child(1) {
      // align-content: center;
      position: absolute;
      right: 18%;
    }
    span:nth-child(2) {
      // align-content: center;
      position: absolute;
      right: 28%;
    }
    span:nth-child(3) {
      // align-content: center;
      position: absolute;
      right: 38%;
    }
  }
  .window {
    position: absolute;
    transform: translate(-50%, -90%);
    left: 50%;
    top: 50%;
    // width: 100vw;
    .window-font {
      font-size: 180px;
      font-family: "SpicyChips", sans-serif; /* 使用正确的字体名称 */
      color: rgba(255, 255, 255, 0.8);
      // position: absolute;
      // top: 20%;
      // left: 35%;
    }
  }
}

body {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  // font-family: "sourcehansans";

  overflow-x: hidden;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  font-family: "sourcehansans";
}
</style>
