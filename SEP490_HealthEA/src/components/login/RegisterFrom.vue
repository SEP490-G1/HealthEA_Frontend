<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <form @submit.prevent="register">
        <h3>Đăng ký</h3>
        <RouterLink to="login">Login now</RouterLink>

        <div class="form-group">
          <label>Tên</label>
          <input
            type="text"
            class="form-control"
            v-model="user.first_name"
            placeholder="First Name"
            required
          />
        </div>

        <div class="form-group">
          <label>Họ</label>
          <input
            type="text"
            class="form-control"
            v-model="user.last_name"
            placeholder="Last Name"
            required
          />
        </div>

        <div class="form-group">
          <label>Username</label>
          <input
            type="text"
            class="form-control"
            v-model="user.username"
            placeholder="User Name"
            required
          />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            v-model="user.email"
            placeholder="Email"
            required
          />
        </div>

        <div class="form-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            class="form-control"
            v-model="user.phone"
            placeholder="Phone"
            required
            @blur="validatePhoneNumber()"
            v-bind:class="{ 'is-invalid': error.phoneNumber }"
          />
          <div class="invalid-feedback" v-if="error.phoneNumber">
            {{ error.phoneNumber }}
          </div>
        </div>

        <div class="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            class="form-control"
            v-model="user.password"
            placeholder="Password"
            required
          />
        </div>

        <div class="form-group" style="margin-bottom: 20px">
          <label>Xác nhận mật khẩu</label>
          <input
            type="password"
            class="form-control"
            v-model="password_confirm"
            placeholder="Confirm Password"
            required
            @blur="validatePassword()"
            v-bind:class="{ 'is-invalid': error.confirm_pass }"
          />
          <div class="invalid-feedback" v-if="error.confirm_pass">
            {{ error.confirm_pass }}
          </div>
        </div>
        <a-form-item :wrapper-col="{ offset: 9, span: 18 }">
          <a-button type="primary" html-type="submit">Đăng ký</a-button>
        </a-form-item>
      </form>
    </div>
  </div>
</template>
<script>
import { useUserStore } from '@/stores/user'
import { getCookieToken } from '@/service/main'
export default {
  async beforeUpdate() {
    if ((await getCookieToken()) == null) {
      return
    }
    console.log('Tài khoản đã đăng nhập', this.$router.replace('/'))
  },
  data() {
    return {
      user: {
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        email: '',
        phone: ''
      },
      password_confirm: '',
      error: {
        phoneNumber: '',
        confirm_pass: ''
      }
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

<style>
@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800');

.auth-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}

.auth-inner {
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}

.auth-wrapper .form-control:focus {
  border-color: #167bff;
  box-shadow: none;
}

.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

.auth-wrapper label {
  display: block;
  font-weight: 400;
  margin: 5px 0px;
  /* Khoảng cách giữa label và input */
  font-size: 16px;
  color: #333;
}
</style>
