<template lang="">
  <div class="container">
    <a-typography-title>Đăng ký</a-typography-title>
    <a-typography-title style="margin-top: 0px; margin-bottom: 50px" :level="5"
      >Bạn đã có tài khoản? Đăng nhập ngay
      <RouterLink to="login">tại đây</RouterLink></a-typography-title
    >
    <a-row style="width: 100%; display: flex; flex-direction: column; align-content: center">
      <a-form
        :label-col="this.labelCol"
        :wrapper-col="this.wrapperCol"
        style="width: 35%"
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Tên của bạn"
          name="lastname"
          :rules="[{ required: true, message: 'Tên không được để trống!' }]"
        >
          <a-input v-model:value="formState.lastname" />
        </a-form-item>
        <a-form-item
          label="Họ của bạn"
          name="firstName"
          :rules="[{ required: true, message: 'Họ không được để trống!' }]"
        >
          <a-input v-model:value="formState.firstName" />
        </a-form-item>
        <a-form-item
          label="Tên đăng nhập"
          name="username"
          :rules="[{ required: true, message: 'Tên đăng nhập không được để trống!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item
          label="Email"
          name="email"
          :rules="[{ required: true, message: 'Email không được để trống!' }]"
        >
          <a-input v-model:value="formState.email" />
        </a-form-item>
        <a-form-item
          label="Số điện thoại"
          name="phone"
          :rules="[
            { required: true, message: 'Số điện thoại không được để trống!' },
            { len: 10, message: 'Độ dài số điện thoại phải 10 chữ số' },
            {
              pattern: /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/,
              message: 'Độ dài số điện thoại không hợp lệ'
            }
          ]"
        >
          <a-input v-model:value="formState.phone" />
        </a-form-item>

        <a-form-item
          label="Mật khẩu"
          name="password"
          :rules="[
            { required: true, message: 'Mật khẩu không được để trống!' },
            { min: 8, max: 25, message: 'Độ dài mật khẩu phải từ 8 - 25 chữ số' },
            {
              pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}/,
              message: 'Mật khẩu phải có ít nhất một chữ hoa một chữ thường một số'
            }
          ]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-form-item
          label="Xác nhận mật khẩu"
          name="re_password"
          :rules="[
            { required: true, message: 'Bạn phải nhập lại mật khẩu' },
            {
              validator: validatePass2
            }
          ]"
        >
          <a-input-password v-model:value="formState.re_password" />
        </a-form-item>
        <a-form-item align="center" name="acp">
          <a-checkbox
            style="width: 100%; display: flex; justify-content: center"
            v-model:checked="this.formState.acp"
            >Tôi chấp nhận điều khoản dịch vụ</a-checkbox
          >
        </a-form-item>
        <a-form-item align="center" style="width: 100%; margin: 0; display: flex">
          <a-button size="large" style="width: 100%" html-type="submit" type="primary"
            >Đăng ký ngay</a-button
          >
        </a-form-item>
      </a-form>
    </a-row>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { reactive } from 'vue'
import { message } from 'ant-design-vue'

export default {
  data() {
    return {
      labelCol: {
        style: {
          width: '150px'
        }
      },
      wrapperCol: {
        span: 15
      },
      formState: reactive({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        re_password: '',
        acp: false
      })
    }
  },
  methods: {
    async validatePass2(_rule, value) {
      if (value !== this.formState.password) {
        return Promise.reject('Hai mật khẩu không giống nhau')
      } else {
        return Promise.resolve()
      }
    },
    onFinish(value) {
      console.log(value)
      this.register(value)
    },
    onFinishFailed() {
      message.error('Kiểm tra lại form', 3)
    },
    async register(value) {
      let newValue = value
      var userStoreLogin = useUserStore()
      const registerResponse = await userStoreLogin.Register(newValue)
      if (registerResponse == false) {
        return
      }
      console.log(registerResponse)
      this.$router.push({ path: '/client/login' })
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
