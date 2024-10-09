import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import "./assets/css/style.css"
import axios from 'axios'
import VueAxios from 'vue-axios'
import swal from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import i18n from './plugins/i18n';

const app = createApp(App).use(router)
axios.defaults.baseURL = 'http://localhost:9090/identity'
axios.defaults.headers.common['Content-Type'] = 'application/json'
app.use(VueAxios, {$request: axios})
app.use(swal)
app.use(i18n);
app.mount('#app')
