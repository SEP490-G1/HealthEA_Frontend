import { defineStore } from 'pinia'
import { getData, postData } from '@/service/main'
const API_URL = `${import.meta.env.VITE_API_URL_DOTNET}/api/DocumentChat`
import { useUserStore } from '@/stores/user'

const headers = {
  // Các tùy chọn cấu hình khác
  headers: {
    'Content-Type': 'application/json'
  }
}

export const useChatDocument = defineStore('chatDocument', {
  actions: {
    async sendId(id, body) {
      const userStore = useUserStore()
      headers.headers.Authorization = `Bearer ${userStore.token}`
      const data = await postData(API_URL + `/${id}`, body, headers)
      return data
    },
    async getChat() {
      const userStore = useUserStore()
      headers.headers.Authorization = `Bearer ${userStore.token}`
      const data = await getData(API_URL, headers)
      return data
    }
  }
})
