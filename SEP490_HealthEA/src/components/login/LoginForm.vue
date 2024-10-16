<template lang="">
  <div class="container">
    <h1>Login</h1>
    <RouterLink to="register">register</RouterLink>
    <div class="form-group"  >
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="this.formState.username" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="this.formState.password" />
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox v-model:checked="this.formState.remember">Remember me</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Login</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { login } from '@/service/main'
import { getMyInfo } from '@/service/main'
import { useUserStore } from '@/stores/user'

export default {
  setup() { },
  data() {
    return {
      formState: reactive({
        username: '',
        password: '',
        role: '',
        remember: true
      })
    }
  },
  methods: {
    async onFinish() {
      console.log('Login formState:', this.formState)

      const linkLogin = 'http://localhost:9090/identity/auth/token'
      const bodyLogin = {
        username: this.formState.username,
        password: this.formState.password
      }
      try {
        const loginResponse = await login(linkLogin, bodyLogin)

        const userStore = useUserStore()
        userStore.login(this.formState.username, loginResponse.data.result.token, true)

        const infoResponse = await getMyInfo('http://localhost:9090/identity/users/myinfo')
        userStore.getInfo(infoResponse.data.result.id, infoResponse.data.result.role)

        alert('Login successful')
      } catch (error) {
        console.log('Login failed:', error)
      }
    },
    onFinishFailed: (errorInfo) => {
      console.log('Failed:', errorInfo)
    }
  }
}
</script>
<style scope>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.form-group {
  margin-top: 20px;
}
</style>
