<template>
    <div>
        <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" style="border-bottom: 1px solid #ccc" />
        <Editor :defaultConfig="editorConfig" :mode="mode" v-model="valueHtml" style="height: 400px; overflow-y: hidden"
            @onCreated="handleCreated" @onChange="handleChange" />
    </div>
</template>

<script setup>
import { AdminStore } from '../stores/AdminStore';
import '@wangeditor/editor/dist/css/style.css';
import { ref, reactive, inject, shallowRef, onMounted, onBeforeUnmount } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
// 引入路由
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
// 注入
const axios = inject("axios")
const message = inject("message")
const server_url = inject("server_url")
// 实例化 adminstore
const adminstore = new AdminStore()
// -----------------------------------------
// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();
const toolbarConfig = { excludeKeys: ["uploadVideo"] };
const mode = ref("default")
const editorConfig = { placeholder: '请输入内容...' };
const valueHtml = ref("")
// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;

    editor.destroy();
});
// 编辑器回调函数
const handleCreated = (editor) => {
    // console.log('created', editor);
    editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = (editor) => {
    // console.log('change:', editor.getHtml());
    if (initFinished) {
        emit("update:model-value", valueHtml.value)
    }
};
// --------------------------------------------
let initFinished = false
onMounted(() => {
    setTimeout(() => {
        valueHtml.value = props.modelValue;
        initFinished = true
    }, 10);
})
const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    }
})
// update:model-value 将需要跑的事件在这里注册
const emit = defineEmits(["update:model-value"])
//图片上传 ==================================================
editorConfig.MENU_CONF = {} // 对象需要初始化
editorConfig.MENU_CONF['uploadImage'] = {
    base64LimitSize: 10 * 1024, // 10kb
    server: server_url + '/upload/rich_editor_upload',// 需要完整上传地址
}
editorConfig.MENU_CONF['insertImage'] = {
    parseImageSrc: (src) => {
        if (src.indexOf("http") != 0) {
            return `${server_url}${src}`
        }
        return src
    }
}
</script>

<style lang="scss" scoped>
</style>
