import { defineStore } from 'pinia'
import { getData, putData } from '@/service/main'
import { useUserStore } from '@/stores/user'
const API_URL = 'http://localhost:5217/api/Doctor'

const headers = {
  // Các tùy chọn cấu hình khác
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json'
  }
}

export const doctorManagementStore = defineStore('doctorManagement', {
  state: () => ({
    listUser: []
  }),
  actions: {
    async getAllDoctor() {
      const userStore = useUserStore()
      headers.headers.Authorization = `Bearer ${userStore.token}`
      const data = await getData(API_URL, headers)
      return data
    },
    async updateDoctorById(id, obj) {
      const userStore = useUserStore()
      headers.headers.Authorization = `Bearer ${userStore.token}`
      console.log('tss', id)

      const data = await putData(API_URL + `/${id}`, obj, headers)
      return data
    },
    async removeDoctor(id) {
      const userStore = useUserStore()
      headers.headers.Authorization = `Bearer ${userStore.token}`
      const data = await getData(API_URL + `/${id}`, headers)
      return data
    }
  }
})
