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
  state: () =>  ({
    //user: JSON.parse(getLocalStogare(MEMORY_STOGARE_USER)),
    user: getLocalStogare(MEMORY_STOGARE_USER) ? JSON.parse(getLocalStogare(MEMORY_STOGARE_USER)) : {auth: false},
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
    // async Register(bodyParameters) {
    //   try {
    //     const response = await postData(API_URL + '/users', bodyParameters, {})
    //     console.log('rs' + response)
    //     message.success('đăng ký thành công!')
    //   } catch (error) {
    //     message.error('Error login: ' + error, 3)
    //     return error
    //   }
    // },
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
        var strings = JSON.stringify(obj)
        setLocalStoregare(MEMORY_STOGARE_USER, strings)
        return obj
      } catch (error) {
        // this.ClearUser()
        console.error(error)
      }
    },
    async Login(bodyParameters) {
      try {
        const body = {
          username: bodyParameters.username,
          password: bodyParameters.password
        }

        const response = await postData(API_URL + '/auth/token', body, headers)
        if (response.status == 401) {
          throw 'Kiểm tra lại tài khoản và mật khẩu'
        }
        if (response.status == 404) {
          throw 'Not found! không tìm thấy server, liên hệ'
        }

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
        message.error('Lỗi đăng nhập: ' + error, 3)
        return false
      }
    }
  }
})
