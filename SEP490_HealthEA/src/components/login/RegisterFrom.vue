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
      >
        <a-form-item
          label="Tên của bạn"
          name="lastname"
          :rules="[{ required: true, message: 'Tên không được để trống!' }]"
        >
          <a-input v-model:value="this.formState.lastname" />
        </a-form-item>
        <a-form-item
          label="Họ của bạn"
          name="firstname"
          :rules="[{ required: true, message: 'Họ không được để trống!' }]"
        >
          <a-input v-model:value="this.formState.firstName" />
        </a-form-item>
        <a-form-item
          label="Tên đăng nhập"
          name="user_name"
          :rules="[{ required: true, message: 'Tên đăng nhập không được để trống!' }]"
        >
          <a-input v-model:value="this.formState.username" />
        </a-form-item>
        <a-form-item
          label="Email"
          name="email"
          :rules="[{ required: true, message: 'Email không được để trống!' }]"
        >
          <a-input v-model:value="this.formState.email" />
        </a-form-item>
        <a-form-item
          label="Số điện thoại"
          name="username"
          @blur="validatePhoneNumber()"
          :rules="[{ required: true, message: 'Số điện thoại không được để trống!' }]"
        >
          <a-input v-model:value="this.formState.phoneNumber" />
        </a-form-item>

        <a-form-item
          label="Mật khẩu"
          name="pass_word"
          :rules="[{ required: true, message: 'Mật khẩu không được để trống!' }]"
        >
          <a-input-password v-model:value="this.formState.password" />
        </a-form-item>
        <a-form-item
          label="Xác nhận mật khẩu"
          name="password"
          :rules="[{ required: true, message: 'Mật khẩu không được để trống!' }]"
        >
          <a-input-password v-model:value="this.formState.re_password" />
        </a-form-item>
      </a-form>
      <a-form-item name="remember">
        <a-checkbox
          style="width: 100%; display: flex; justify-content: center"
          v-model:checked="this.formState.acp"
          >Tôi chấp nhận điều khoản dịch vụ</a-checkbox
        >
      </a-form-item>
      <a-form-item style="width: 100%; background-color: aqua; margin: 0; display: flex">
        <a-button size="large" style="width: 100%" type="primary" @click="register()"
          >Đăng ký ngay</a-button
        >
      </a-form-item>
    </a-row>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

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
      formState: ref({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        re_password: '',
        acp: false
      })
    }
  },
  methods: {
    validatePhoneNumber() {
      const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/
      if (!phoneRegex.test(this.user.phone)) {
        this.error.phoneNumber = 'Số điện thoại không hợp lệ. Vui lòng nhập lại!'
        return false
      }
      this.error.phoneNumber = ''
      return true
    },
    validatePassword() {
      let isValid = true
      if (this.user.password != this.password_confirm) {
        this.error.confirm_pass = 'Password and Confirm password must be the same!'
        isValid = false
      }
      return isValid
    },
    async register() {
      const bodyRegister = {
        username: this.user.username,
        password: this.user.password,
        email: this.user.email,
        phone: this.user.phone,
        firstName: this.user.first_name,
        lastName: this.user.last_name
      }
      var userStoreLogin = useUserStore()
      try {
        const registerResponse = await userStoreLogin.Register(bodyRegister)
        console.log(registerResponse)
        // this.$router.push({ name: 'verifyEmail', params: { email: this.user.email } });
        alert('Đăng ký thành công')
      } catch (error) {
        console.log('Đăng ký thất bại:', error)
      }
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
