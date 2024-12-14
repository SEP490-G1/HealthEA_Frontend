import { defineStore } from 'pinia'
import { getData, postData } from '@/service/serviceIndex'
const API_URL = `${import.meta.env.VITE_API_URL_DOTNET}/api/Images`

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
    },
    async postImage(iamge) {
      const response = await postData(API_URL, iamge, headers)
      return response
    }
  }
})
