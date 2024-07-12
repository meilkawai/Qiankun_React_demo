import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import { createDiscreteApi } from 'naive-ui'

import App from './App.vue'
import router from './router/index.js'
import axios from 'axios'
import { AdminStore } from './stores/AdminStore';


const { message, notification, dialog } = createDiscreteApi(["message", "notification", "dialog"])

const app = createApp(App)

// 全局配置axios baseUrl 地址 (服务端地址)
axios.defaults.baseURL = "http://localhost:8080"
// 全局提供axios
app.provide("axios", axios)
app.provide("message", message)
app.provide("notification", notification)
app.provide("dialog", dialog)
app.provide("server_url", axios.defaults.baseURL)

app.use(createPinia())
app.use(router)
app.use(naive)

const adminstore = new AdminStore()
// 拦截器，用作自动添加headers==>请求拦截器
axios.interceptors.request.use((config) => {
    config.headers.token = adminstore.token
    return config
})

app.mount('#app')
