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
  clearUser,
  putData
} from '@/service/serviceIndex'

const API_URL = `${import.meta.env.VITE_API_URL_JAVA}/identity`
const headers = {
  headers: {
    'Content-Type': 'application/json'
  }
}
const MEMORY_STOGARE = 'USERTOKEN'
const MEMORY_STOGARE_USER = 'USEROBJECT'
export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(getSessionStogare(MEMORY_STOGARE_USER))
      ? JSON.parse(getSessionStogare(MEMORY_STOGARE_USER))
      : JSON.parse(getLocalStogare(MEMORY_STOGARE_USER)),
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
      this.user = null
      this.token = null
    },
    async Register(bodyParameters) {
      const response = await postData(API_URL + '/users', bodyParameters, headers)
      return response
    },
    async getUser() {
      try {
        if (this.token == null) {
          return
        }

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
          imageSrc: data.avatar,
          gender: data.gender,
          role: data.role,
          status: data.status == 'ACTIVE' ? true : false,
          auth: true
        }

         this.user = obj
        return obj
      } catch (error) {
        // this.ClearUser()
        console.error(error)
      }
    },
    async verifyById(id) {
      const response = await postData(API_URL + '/emails/verifyEmail/' + id)
      console.log(response)

      return response
    },
    async verify(email) {
      const response = await postData(API_URL + '/emails/sendVerifyEmail/' + email)
      return response
    },
    async Login(bodyParameters) {
      const body = {
        username: bodyParameters.username,
        password: bodyParameters.password
      }
      const response = await postData(API_URL + '/auth/token', body)
      try {
        if (response.data.code == 0) {
          this.token = await response.data.result.token
          this.user = await this.getUser()
          //save token session
          if (bodyParameters.remember == false) {
            await setSessionStogare(MEMORY_STOGARE, this.token)
            let strings = JSON.stringify(this.user)
            setSessionStogare(MEMORY_STOGARE_USER, strings)
          }
          if (bodyParameters.remember == true) {
            await setLocalStoregare(MEMORY_STOGARE, this.token)
            let strings = JSON.stringify(this.user)
            setLocalStoregare(MEMORY_STOGARE_USER, strings)
          }

          message.success('Đăng nhập thành công', 3)
          return true
        }
      } catch (error) {
        console.log(error);
        
        if (response.response.data.code == 1020) {
          message.info('Hãy xác thực email tải khoàn của bạn', 10)
          return 1020
        }
        if (response.response.data.code == 1005) {
          message.error('Kiểm tra tài khoản và mật khẩu', 3)
          return
        }

        return false
      }
    },
    async UpdateUser(bodyParameters, userId) {
      const response = await putData(API_URL + '/users/' + userId, bodyParameters, headers)
      return response
    }
  }
})
