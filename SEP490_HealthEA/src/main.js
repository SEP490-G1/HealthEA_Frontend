import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import swal from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(swal)

app.use(Antd)
app.mount('#app')
