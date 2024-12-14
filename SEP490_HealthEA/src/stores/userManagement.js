import { defineStore } from 'pinia'
import { getData } from '@/service/serviceIndex'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'
const API_URL = `${import.meta.env.VITE_API_URL_JAVA}/identity/users`

const headers = {
  // Các tùy chọn cấu hình khác
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json'
  }
}

export const userManagementStore = defineStore('userManagement', {
  state: () => ({
    listUser: []
  }),
  actions: {
    async getAllUser() {
      try {
        const userStore = useUserStore()
        headers.headers.Authorization = `Bearer ${userStore.token}`
        const data = await getData(API_URL + '?page=0&size=100', headers)
        if (data.data.code == 0) {
          message.success('Lấy dữ liệu thành công!', 10)
          return await data.data.result
        }
        return null
      } catch (error) {
        return error
      }
    }
  }
})
