import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import SvgIcon from './components/SvgIcon.vue'
import App from './App.vue'
import router from './router'
import 'virtual:svg-icons-register'
import './style/reset.scss'
import '@/style/variable.scss'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.component('svg-icon', SvgIcon)
app.use(ElementPlus, { locale: zhCn })
app.use(createPinia())
app.use(router)

app.mount('#app')
