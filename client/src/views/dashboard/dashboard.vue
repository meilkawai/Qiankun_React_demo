<template>
  <div class="main-panel">
    <div class="meaus">
      <div v-for="(meau, index) in meaus" :key="index" @click="topage(meau)">
        {{ meau.name }}
      </div>
    </div>
    <div style="padding: 20px; width: 100%">
      <router-view></router-view>
    </div>
    <div class="title">后台管理系统</div>
  </div>
</template>

<script setup>
import { AdminStore } from "../../stores/AdminStore";
import { ref, reactive, inject } from "vue";
// 引入路由
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
// 注入
const axios = inject("axios");
const message = inject("message");
// 实例化 adminstore
const adminstore = new AdminStore();

//----------------------------------
const meaus = [
  { name: "文章管理", href: "/dashboard/article" },
  { name: "分类管理", href: "/dashboard/category" },
  { name: "跳转分类", href: "/homePage" },
  { name: "退出", href: "logout" },
];

const topage = (meau) => {
  if (meau.href == "logout") {
    router.push("/");
  } else {
    router.push(meau.href);
  }
};
</script>

<style lang="scss" scoped>
.main-panel {
  display: flex;
  color: #64676a;
  max-width: 1500px;
  margin: 0 auto;
}

.meaus {
  padding: 20px 0;
  box-sizing: border-box;
  line-height: 55px;
  text-align: center;
  width: 180px;
  height: 95vh;
  border-right: 1px solid #dadada;

  div {
    cursor: pointer;

    &:hover {
      color: #fd760e;
    }
  }
}

.title {
  font-size: 65px;
  font-weight: bold;
  text-align: right;
  position: fixed;
  color: rgba(0, 0, 0, 20%);
  right: calc((100vw - 1500px) / 2);
  bottom: 20px;
}
</style>
