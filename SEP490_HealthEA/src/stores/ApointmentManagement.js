import { defineStore } from 'pinia'
import { getData, postData } from '@/service/main'
import { useUserStore } from '@/stores/user'
const API_URL = 'http://localhost:5217/api/Appointments'

const headers = {
  // Các tùy chọn cấu hình khác
  headers: {
    'Content-Type': 'application/json'
  }
}

// const storeApoint = useApointment()
// storeApoint.updateStatus(idApoint, )

export const useApointment = defineStore('apointment', {
  actions: {
    async getApoinmentDoctor(pagenumber, pagesize) {
      const userStore = useUserStore()
      headers.headers.Authorization = `Bearer ${userStore.token}`
      const data = await getData(API_URL + `?PageNumber=${pagenumber}&PageSize=${pagesize}`, headers)
      return data
    },
    async updateStatus(id, status) {
      const userStore = useUserStore()
      headers.headers.Authorization = `Bearer ${userStore.token}`
      var statusString = status == true ? 'approve' : 'reject'
      const data = await postData(API_URL + `/${statusString}/${id}`, {} , headers)
      return data
    }
  }
})
