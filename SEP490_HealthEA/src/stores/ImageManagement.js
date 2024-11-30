import { defineStore } from 'pinia'
import { getData } from '@/service/main'
const API_URL = 'http://localhost:5217/api/Images'

const headers = {
  // Các tùy chọn cấu hình khác
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json'
  }
}

export const imageStore = defineStore('imageStore', {

  actions: {
    async getLinkImage(id) {
        const data = await getData(API_URL + `/get/${id}`, headers)
        return data
    }
  }
})
