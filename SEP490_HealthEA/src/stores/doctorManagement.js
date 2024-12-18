import { defineStore } from 'pinia'
import { getData, putData } from '@/service/serviceIndex'
import { useUserStore } from '@/stores/user'
const API_URL = `${import.meta.env.VITE_API_URL_DOTNET}/api/Doctor`

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
      const data = await getData(API_URL, headers)
      return data
    },
    async getId(id) {
      const data = await getData(API_URL + `/${id}`, headers)
      return data
    },
    async updateDoctorById(id, obj) {
      const userStore = useUserStore()
      headers.headers.Authorization = `Bearer ${userStore.token}`
      const data = await putData(API_URL + `/${id}`, obj, headers)
      return data
    },

    async addDoctor(obj){
      console.log(obj);
      
    },
    async removeDoctor(id) {
      const userStore = useUserStore()
      headers.headers.Authorization = `Bearer ${userStore.token}`
      const data = await getData(API_URL + `/${id}`, headers)
      return data
    }
  }
})
