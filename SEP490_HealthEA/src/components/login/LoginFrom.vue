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
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-button type="primary" @click="onLoginEvent">Login Test User</a-button>
  </div>
</template>
<script>
import { reactive } from 'vue'
export default {
  setup() {},
  data() {
    return {
      // Tạo 1 reactive state có thuộc tính username pasword remember
      formState: reactive({
        username: '',
        password: '',
        remember: true
      })
    }
  },
  methods: {
    onLoginEvent: () => {
      console.log('click login')

      // this.storeUser.Login(
      //   'handsome',
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSmFuZVNtaXRoIiwianRpIjoiNWVmZDdjOWItNDI5NS00NjM4LThiOWYtMmQwY2ZlMTI4NjY0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MjMyODQxNjA4OSwiaXNzIjoiUTEiLCJhdWQiOiJRMSJ9.LtsIsOniGTKAP1Lv_s0IpmRBot8XeOVzon4gI8KanTc'
      // )
    },
    onFinish: (values) => {
      console.log('Success:', values)
      console.log('formState:', this.formState)
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
