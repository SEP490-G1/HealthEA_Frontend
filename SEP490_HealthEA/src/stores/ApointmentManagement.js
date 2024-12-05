import { defineStore } from 'pinia'
import { getData, postData } from '@/service/main'
import { useUserStore } from '@/stores/user'
const API_URL = `${import.meta.env.VITE_API_URL_DOTNET}/api/Appointments`

const headers = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const useApointment = defineStore('apointment', {
  actions: {
    async getApoinmentDoctor(pagenumber, pagesize) {
      const userStore = useUserStore()
      headers.headers.Authorization = `Bearer ${userStore.token}`
      const data = await getData(
        API_URL + `?PageNumber=${pagenumber}&PageSize=${pagesize}`,
        headers
      )
      return data
    },
    async getAppointmentUser(pagenumber, pagesize) {
      const userStore = useUserStore()
      headers.headers.Authorization = `Bearer ${userStore.token}`
      const data = await getData(
        API_URL + `/customer?PageNumber=${pagenumber}&PageSize=${pagesize}`,
        headers
      )
      return data
    },
    async updateStatus(id, status) {
      const userStore = useUserStore()
      headers.headers.Authorization = `Bearer ${userStore.token}`
      var statusString = status == true ? 'approve' : 'reject'
      const data = await postData(API_URL + `/${statusString}/${id}`, {}, headers)
      return data
    }
  }
})
