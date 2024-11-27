import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import { deleteData, getData, patchData, getAppointment } from '@/service/main'
import { useUserStore } from '@/stores/user'
const API_URL = 'http://localhost:5217/api/Appointments/'

const headers = {
  headers: {
    'Content-Type': 'application/json'
  }
}
export const useAppointment = defineStore('dailyMetric', {
  actions: {
    async getAppointment(link) {
      try {
        const userStore = useUserStore()
        headers.headers.Authorization = `Bearer ${userStore.token}`
        const data = await getAppointment(link)
        message.success('Lấy dữ liệu thành công')

        return data
      } catch (error) {
        console.log(error)
        message.error('Error fetching data:' + error, 3)
      }
    }
  }
})
