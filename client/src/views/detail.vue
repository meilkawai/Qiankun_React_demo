<template>
  <div class="container">
    <div class="n-button_">
      <n-button @click="backToHomePage">返回首页</n-button>
      <n-button @click="backToTitleList" class="backToTitleList"
        >返回文章列表</n-button
      >
    </div>
    <n-divider />
    <!-- 文章标题 -->
    <n-h1>{{ blogInfo.title }}</n-h1>
    <!-- 文章内容 -->
    <div class="blog-content">
      <div v-html="blogInfo.content"></div>
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
onMounted(() => {
  loadBlogDetail();
});
const blogInfo = ref({});
const loadBlogDetail = async () => {
  // console.log(route.query.id);
  let res = await axios.get(`/blog/detail?id=${route.query.id}`);
  blogInfo.value = res.data.rows[0];
  // console.log(res);
};

const backToHomePage = () => {
  router.push("/");
};
const backToTitleList = () => {
  router.push("/dashboard/article");
};
</script>


<style>
.blog-content img {
  /* // 不能超过父级的100% */
  max-width: 100% !important;
}
</style>
<style lang="scss" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
.n-button_ {
  margin: 20px auto;
  .backToTitleList {
    margin-left: 10px;
    background-color: lightcoral;
  }
}
</style>
