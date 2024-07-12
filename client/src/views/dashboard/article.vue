<template>
    <div>
        <n-tabs v-model:value="tabValue" justify-content="start" type="line">
            <n-tab-pane name="list" tab="文章列表">
                <div v-for="(blog, index) in blogListInfo" :key="index" style="margin-bottom: 15px;">
                    <n-card :title="blog.title">
                        {{ blog.content }}
                        <template #footer>
                            <n-space align="center">
                                <div>发布时间: {{ blog.create_time }}</div>
                                <n-button @click="toDelete(blog)">删除</n-button>
                                <n-button type="error" @click="toUpdate(blog)">修改</n-button>
                            </n-space>
                        </template>
                    </n-card>
                </div>

                <!-- 页码 -->
                <n-space>
                    <n-button v-for="(pageNum, index) in   pageInfo.pageCount  " :key="index" @click="toPage(pageNum)"
                        :style="{ backgroundColor: pageNum == pageInfo.page ? 'lightblue' : '' }">
                        {{ pageNum }}
                    </n-button>
                </n-space>
            </n-tab-pane>
            <n-tab-pane name="add" tab="添加文章">
                <n-form>
                    <n-form-item label="标题">
                        <n-input v-model:value="addArticle.title" placeholder="请输入标题" />
                    </n-form-item>
                    <n-form-item label="分类">
                        <n-select v-model:value="addArticle.categoryId" :options="categoryOptions" />
                    </n-form-item>
                    <n-form-item label="内容">
                        <!-- <n-input v-model:value="addArticle.content" /> -->
                        <richTextEditor v-model="addArticle.content"></richTextEditor>
                        <!-- {{ addArticle.content }} -->
                    </n-form-item>
                    <n-form-item>
                        <n-button @click="add" type="error">提交</n-button>
                    </n-form-item>
                </n-form>
            </n-tab-pane>
            <n-tab-pane name="update" tab="修改">
                <n-form>
                    <n-form-item label="标题">
                        <n-input v-model:value="updateArticle.title" placeholder="请输入标题" />
                    </n-form-item>
                    <n-form-item label="分类">
                        <n-select v-model:value="updateArticle.categoryId" :options="categoryOptions" />
                    </n-form-item>
                    <n-form-item label="内容">
                        <!-- <n-input v-model:value="addArticle.content" /> -->
                        <richTextEditor v-model="updateArticle.content"></richTextEditor>
                        <!-- {{ addArticle.content }} -->
                    </n-form-item>
                    <n-form-item>
                        <n-button @click="update" type="error">提交</n-button>
                    </n-form-item>
                </n-form>
            </n-tab-pane>
        </n-tabs>


    </div>
</template>

<script setup>
import { AdminStore } from '../../stores/AdminStore';
import { ref, reactive, inject, onMounted } from 'vue'
import richTextEditor from '../../components/richTextEditor.vue'
// 引入路由
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
// 注入
const axios = inject("axios")
const message = inject("message")
const dialog = inject("dialog")

// 实例化 adminstore
const adminstore = new AdminStore()
// -------------------------------------------
const addArticle = reactive({
    categoryId: 0,
    title: "",
    content: ""
})
const updateArticle = reactive({
    id: 0,
    categoryId: 0,
    title: "",
    content: ""
})
const pageInfo = reactive({
    page: 1,
    pageSize: 3,
    pageCount: 1,
    count: 0
})
const categoryOptions = ref([])
const tabValue = ref("list")
const toUpdate = async (blog) => {
    tabValue.value = "update"
    let res = await axios.get(`/blog/detail?id=${blog.id}`)
    // console.log(res);
    updateArticle.id = blog.id
    updateArticle.title = res.data.rows[0].title
    updateArticle.content = res.data.rows[0].content
    updateArticle.categoryId = res.data.rows[0].category_id

}
const toDelete = async (blog) => {
    dialog.warning({
        title: "警告",
        content: "是否确认删除",
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: async () => {
            let res = await axios.delete(`/blog/_token/delete?id=${blog.id}`)
            if (res.data.code == 200) {
                message.info(res.data.msg)
                loadBlogs()
            } else {
                message.error(res.data.msg)
            }
        },
        onNegativeClick: () => {
        }
    });

}
const update = async () => {
    let res = await axios.put("/blog/_token/update",
        updateArticle
    )
    if (res.data.code == 200) {
        message.info(res.data.msg)
        // addArticle.content = ""
        tabValue.value = "list"
        loadBlogs()
    } else {
        message.error(res.data.msg)
    }

}
onMounted(() => {
    loadCategroies()
    loadBlogs()
})
const loadCategroies = async () => {
    let res = await axios.get("/category/list")
    categoryOptions.value = res.data.rows.map((item) => {
        return {
            label: item.name,
            value: item.id
        }
    })
}
const add = async () => {
    let res = await axios.post("/blog/_token/add",
        addArticle
    )
    if (res.data.code == 200) {
        message.info(res.data.msg)
        // addArticle.content = ""
    } else {
        message.error(res.data.msg)
    }
}
const toPage = async (pageNum) => {
    pageInfo.page = pageNum
    loadBlogs()

}
const blogListInfo = ref([])
const loadBlogs = async () => {
    let res = await axios.get(`/blog/search?page=${pageInfo.page}&pageSize=${pageInfo.pageSize}`)
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
}


</script>

<style lang="scss" scoped>
</style>
