import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Antd from 'ant-design-vue'
import { isAxiosError } from 'axios'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.errorHandler = async async (err) => {
  console.error(err)

  const auth = useAuthStore()

  if (isAxiosError(err)) {
    switch (err.response?.status) {
      case 401:
        auth.clearUser()
        //rediect user to login
        await router.push('/login')
        break
      case 403:
        //show a toast
        break
    }
  }
}
app.use(Antd)
app.mount('#app')
