import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { setUpToken } from '@/service/main'
import Antd from 'ant-design-vue'

const app = createApp(App)

app.use(createPinia())
//constructor pinia
setUpToken()
//////////////////////
app.use(router)

app.use(Antd)

app.mount('#app')
