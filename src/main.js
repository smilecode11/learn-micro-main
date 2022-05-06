import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import { registerApp } from './util/index'
import { subNavList } from './store/sub'

registerApp(subNavList) //  子应用注册

const app = createApp(App)

app.use(ElementPlus, { size: 'lagger', zIndex: 3000 })
app.use(router())
app.mount('#app')
