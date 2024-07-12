<template>
    <div>
        <n-button @click="showAddModal = true">添加</n-button>
        <n-table :bordered="false" :single-line="false">
            <thead>
                <tr>
                    <th>编号</th>
                    <th>名称</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in categoryList" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>
                        <n-space>
                            <n-button @click="toUpdate(item)">修改</n-button>
                            <n-button type="error" @click="deleteCategory(item)">删除</n-button>
                        </n-space>
                    </td>
                </tr>
            </tbody>
        </n-table>
        <!-- 添加 -->
        <n-modal v-model:show="showAddModal" preset="dialog" title="Dialog">
            <!-- #header 什么意思 -->
            <template #header>
                <div>添加分类</div>
            </template>
            <div>
                <n-input v-model:value="addCategory.name" type="text" placeholder="请输入名称"></n-input>
            </div>
            <template #action>
                <div>
                    <n-button @click="add">提交</n-button>
                </div>
            </template>
        </n-modal>
        <!-- 修改 -->
        <n-modal v-model:show="showUpdateModal" preset="dialog" title="Dialog">
            <!-- #header 什么意思 -->
            <template #header>
                <div>修改分类</div>
            </template>
            <div>
                <n-input v-model:value="updateCategory.name" type="text" placeholder="请输入名称"></n-input>
            </div>
            <template #action>
                <div>
                    <n-button @click="update">提交</n-button>
                </div>
            </template>
        </n-modal>


    </div>
</template>

<script setup>
import { AdminStore } from '../../stores/AdminStore';
import { ref, reactive, inject, onMounted } from 'vue'
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
onMounted(() => {
    loadDatas()
})
// 需要在外面创建响应式数组来拿到res
const categoryList = ref([])
const loadDatas = async () => {
    let res = await axios.get("/category/list")
    // 注意ref需要用.value拿到
    categoryList.value = res.data.rows
}

const showAddModal = ref(false);
const showUpdateModal = ref(false);
const addCategory = reactive({
    name: ""
})
const add = async () => {
    let res = await axios.post("/category/_token/add", {
        name: addCategory.name
    })
    if (res.data.code == 200) {
        loadDatas()
        message.info(res.data.msg)
    } else {
        message.error(res.data.msg)
    }
    showAddModal.value = false;

}
const update = async () => {
    let res = await axios.put("/category/_token/update", {
        name: updateCategory.name,
        id: updateCategory.id
    })
    if (res.data.code == 200) {
        loadDatas()
        message.info(res.data.msg)
    } else {
        message.error(res.data.msg)
    }
    showUpdateModal.value = false;
}
const updateCategory = reactive({
    id: 0,
    name: ""
})
const deleteCategory = async (params) => {
    dialog.warning({
        title: "警告",
        content: "是否确认删除",
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: async () => {
            let res = await axios.delete(`/category/_token/delete?id=${params.id}`)
            if (res.data.code == 200) {
                loadDatas()

                message.info(res.data.msg)
            } else {
                message.error(res.data.msg)
            }
        },
        onNegativeClick: () => {
        }
    });

}
const toUpdate = async (params) => {
    showUpdateModal.value = true;
    updateCategory.id = params.id
    updateCategory.name = params.name
}
</script>

<style lang="scss" scoped>
</style>
