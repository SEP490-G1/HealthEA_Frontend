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
