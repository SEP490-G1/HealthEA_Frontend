import { defineStore } from 'pinia'
// import { getData } from '@/service/main'
import { message } from 'ant-design-vue'
import {  clearToken, postData, getData, setCookieToken } from '@/service/main'

const API_URL = 'http://localhost:9090/identity'
const headers = {
  headers: {
    'Content-Type': 'application/json'
  }
}
export const useUserStore = defineStore('user', {
  state: () => ({
    userFirstName: '',
    userLastName: '',
    userName: '',
    imageSrc: '',
    role: '',
    token: window.localStorage.getItem('TokenUser'),
    status: false,
    auth: false,
  }),
  getters: {
    async setUpUser() {
      return this.userName
    }
  },
  actions: {
    async Logout() {
      this.name = ''
      this.token = ''
      this.auth = false
      clearToken();
      message.success('Đã đăng xuất!')
    },
    async Register(bodyParameters) {
      try {
        const response = await postData(API_URL + '/users', bodyParameters, {})
        console.log('rs' + response)
        message.success('đăng ký thành công!')
      } catch (error) {
        message.error('Error login: ' + error, 3)
        return error
      }
    },
    async getUser() {
      try {
        headers.headers.Authorization = `Bearer ${this.token}`
        const response = await getData(API_URL + '/users/myinfo', headers)
        this.userName = response.data.result.userName
        this.userFirstName = response.data.result.firstName
        this.userLastName = response.data.result.lastName
        this.role = response.data.result.role
        this.status = response.data.result.status == 'ACTIVE' ? true : false
        this.auth = true
      } catch (error) {
        message.error('Error get info: ' + error, 3)
      }
    },
    async Login(bodyParameters) {
      try {
        const response = await postData(API_URL + '/auth/token', bodyParameters)
        ///
        if (response.status == 404) {
          throw 'Đăng nhập thất bại kiểm tra lại tài khoản mật khẩu'
        }
        //success
        this.token = response.data.result.token
        setCookieToken(this.token)
        message.success('Đăng nhập thành công!', 3)
        this.auth = true
        this.getUser()
        return this.auth;
      } catch (error) {
        message.error('Error login: ' + error, 3)
        return error
      }
    }
  }
})
