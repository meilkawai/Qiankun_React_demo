<template>
    <div class="container">
        <div class="nav">
            <div @click="goToHomePage">首页</div>
            <div>
                <n-popselect v-model:value="selectCategory" :options="categoryOptions" trigger="click">
                    <div>分类 {{ categoryName }}</div>
                </n-popselect>
            </div>
            <div @click="goToDashBoard" v-show="verify_identi">后台</div>
            <div @click="goToLogin" v-show="!verify_identi">后台</div>
        </div>
        <!-- 分割线 -->
        <n-divider />
        <!-- 查询框 -->
        <n-space class="search">
            <n-input v-model:value="pageInfo.keyword" :style="{ width: '500px' }" placeholder="请输入关键字"></n-input>
            <n-button type="primary" ghost @click="loadBlogs(0)">搜索</n-button>
        </n-space>
        <!-- 文章列表 -->
        <div v-for="(blog, index) in blogListInfo" :key="index" style="margin-bottom: 15px;">
            <n-card :title="blog.title">
                {{ blog.content }}
                <template #footer>
                    <n-space align="center">
                        <div>发布时间: {{ blog.create_time }}</div>
                    </n-space>
                </template>
            </n-card>
        </div>
        <n-pagination @update:page="loadBlogs" v-model:page="pageInfo.page" :page-count="pageInfo.pageCount"></n-pagination>
        <n-divider />
        <div class="footer">
            <div>Power by Yang Zhen</div>
            <div>XICP备xxxxx号-1</div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from 'vue'
// 引入路由
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
// 注入
const axios = inject("axios")
const message = inject("message")
const dialog = inject("dialog")
// -------------------------------------------------------------------
const selectCategory = ref(0)
const categoryOptions = ref([])
const loadCategroies = async () => {
    let res = await axios.get("/category/list")

    categoryOptions.value = res.data.rows.map((item) => {
        return {
            // 与组件例子中的 {label:"",value:""}对应
            label: item.name,
            value: item.id
        }
    })
}
onMounted(() => {
    loadCategroies()
    loadBlogs()
})
const categoryName = computed(() => {
    let selectedOption = categoryOptions.value.find((Option) => {
        return Option.value == selectCategory.value
    })
    return selectedOption ? selectedOption.label : ""
})
const verify_identi = ()=>{
    return localStorage.getItem('admin') == 'admin' && localStorage.getItem('password') == '123456'
}

const goToDashBoard = () => {
    router.push("/dashboard")
}
const goToLogin = () => {
    router.push("/login")
}
const goToHomePage = () => {
    router.push("/")
}
const blogListInfo = ref([])
const pageInfo = reactive({
    page: 1,
    pageSize: 3,
    pageCount: 1,
    count: 0,
    keyword: ""
})
// const loadBlogs = async (page = 0) => {
//     if (page != 0) {
//         pageInfo.page = page
//     }
// 存在问题
const loadBlogs = async (page = 0) => {
    if (page != 0) {
        pageInfo.page = page
    }
    try {
        let res = await axios.get(`/blog/search?keyword=${pageInfo.keyword}&page=${pageInfo.page}&pageSize=${pageInfo.pageSize}`)
        // console.log(res);
        let temp_rows = res.data.data.rows;
        for (let row of temp_rows) {
            row.content += "..."
            // 转时间戳
            let date = new Date(row.create_time)
            row.create_time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
        }
        blogListInfo.value = temp_rows;
        pageInfo.count = res.data.data.count;
        pageInfo.pageCount = parseInt(pageInfo.count / pageInfo.pageSize) + (pageInfo.count % pageInfo.pageSize > 0 ? +1 : 0);
        if (res.data.code == 200) {
            message.info(res.data.msg)
            // addArticle.content = ""
        } else {
            message.error(res.data.msg)
        }
    } catch (error) {
        message.error(res.data.msg)
    }
}

</script>

<style lang="scss" scoped>
.container {
    width: 1200px;
    margin: 0 auto;
}

.nav {
    display: flex;
    font-size: 20px;
    padding-top: 20px;
    color: #64676a;

    div {
        cursor: pointer;
        margin-right: 15px;

        &:hover {
            color: #f60;
        }
    }
}

.footer {
    text-align: center;
    line-height: 25px;
    color: #64676a;
}
</style>
