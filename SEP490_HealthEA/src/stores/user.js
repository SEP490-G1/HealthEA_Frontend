import { defineStore } from 'pinia'
// import { getData } from '@/service/main'
import { message } from 'ant-design-vue'
import {
  postData,
  getLocalStogare,
  getData,
  setSessionStogare,
  setLocalStoregare,
  getSessionStogare,
  clearUser
} from '@/service/main'

const API_URL = 'http://localhost:9090/identity'
const headers = {
  headers: {
    'Content-Type': 'application/json'
  }
}
const MEMORY_STOGARE = 'USERTOKEN'
const MEMORY_STOGARE_USER = 'USEROBJECT'
export const useUserStore = defineStore('user', {
  state: () => ({
    user: getLocalStogare(MEMORY_STOGARE_USER)
      ? JSON.parse(getLocalStogare(MEMORY_STOGARE_USER))
      : { auth: false },
    token: getLocalStogare(MEMORY_STOGARE)
      ? getLocalStogare(MEMORY_STOGARE)
      : getSessionStogare(MEMORY_STOGARE)
  }),
  getters: {
    async setUpUser() {
      return this.userName
    }
  },
  actions: {
    Logout() {
      this.ClearUser()
      clearUser()
      message.success('Đã đăng xuất!')
    },
    ClearUser() {
      this.user = {}
      this.token = ''
    },
    async Register(bodyParameters) {
      try {
        const response = await postData(API_URL + '/users', bodyParameters, headers)
        message.success('Đăng ký thành công!')
        return response
      } catch (error) {
        console.log(error)
        message.error('Đăng ký thất bại', 3)
        message.error(error, 3)
        return false
      }
    },
    async getUser() {
      try {
        headers.headers.Authorization = `Bearer ${await this.token}`
        const response = await getData(API_URL + '/users/myinfo', headers)
        var data = response.data.result
        var obj = {
          id: data.id,
          email: data.email,
          dob: data.dob,
          userFirstName: data.firstName,
          userLastName: data.lastName,
          userName: data.userName,
          imageSrc: data.imageSrc,
          gender: data.gender,
          role: data.role,
          status: data.status == 'ACTIVE' ? true : false,
          auth: true
        }
        this.user = obj
        console.log(obj);
        
        var strings = JSON.stringify(obj)
        setLocalStoregare(MEMORY_STOGARE_USER, strings)
        return obj
      } catch (error) {
        // this.ClearUser()
        console.error(error)
      }
    },
    async verify(email) {
      try {
        const response = await postData(API_URL + '/emails/sendVerifyEmail/?email=' + email)
        console.log(response)
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async Login(bodyParameters) {
      try {
        const body = {
          username: bodyParameters.username,
          password: bodyParameters.password
        }

        const response = await postData(API_URL + '/auth/token', body, headers)
        console.log(response);
        
        //save token state
        this.token = response.data.result.token

        //save token session
        if (bodyParameters.remember == false) {
          await setSessionStogare(MEMORY_STOGARE, this.token)
        }
        if (bodyParameters.remember == true) {
          await setLocalStoregare(MEMORY_STOGARE, this.token)
        }

        //setup user
        this.getUser()
        message.success('Đăng nhập thành công ', 3)
        return true
      } catch (error) {
        if (error.response.data.code == 1020) {
          console.log(error)
          message.info('Hãy xác thực email tải khoàn của bạn', 10)
          return 1020
        }
        if (error.response.data.code == 1005) {
          message.error('Kiểm tra tài khoản và mật khẩu', 3)
          return
        }

        return false
      }
    }
  }
})
