import { defineStore } from 'pinia'
import { getData } from '@/service/main'
import { useUserStore } from '@/stores/user'
const API_URL = 'http://localhost:5217/api/Notification'

const headers = {
  // Các tùy chọn cấu hình khác
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json'
  }
}

export const noticeStore = defineStore('noticeStore', {
  state: () => ({
    listNotice: []
  }),
  actions: {
    async getNotice(pageNumber, pageSize) {
      const userStore = useUserStore()
      headers.headers.Authorization = `Bearer ${userStore.token}`

      const data = await getData(
        API_URL + `?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        headers
      )

      return data
    }
  }
})
