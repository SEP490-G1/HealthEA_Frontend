import { defineStore } from 'pinia'
import { postData } from '@/service/main'
const API_URL = `${import.meta.env.VITE_API_URL_DOTNET}/api/Scan`

const headers = {
  // Các tùy chọn cấu hình khác
  headers: {
    'Content-Type': 'application/json'
  }
}

export const useAI = defineStore('AISTORE', {
  actions: {
    async scan(formData1, type) {
      const response = await postData(API_URL + type, formData1, headers)
      return response
    }
  }
})
