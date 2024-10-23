<template lang="">
  <div class="container">
    <h1>Login</h1>
    <RouterLink to="register">register</RouterLink>
    <div>
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
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
          <a-button
            type="primary"
            @click="onLoginEvent(this.formState.username, this.formState.password)"
            html-type="submit"
            >Login</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { getCookieToken } from '@/service/main'
export default {
  async mounted() {
    if ((await getCookieToken()) == null) {
      return
    }
    console.log('Tài khoản đã đăng nhập', this.$router.replace('/'))
  },
  data() {
    return {
      // Tạo 1 reactive state có thuộc tính username pasword remember
      formState: ref({
        username: '',
        password: '',
        remember: true
      })
    }
  },
  methods: {
    onLoginEvent: (username, password) => {

      var userStoreLogin = useUserStore()
      var obj = { username: username, password: password }
      userStoreLogin.Login(obj)
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
</style>
