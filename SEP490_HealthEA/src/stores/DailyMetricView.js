import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import { getData } from '@/service/main'
import { useUserStore } from '@/stores/user'
const API_URL = 'http://localhost:5217/api/DailyMetric'

const headers = {
  // Các tùy chọn cấu hình khác
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json'
  }
}
export const useDailyMetricStore = defineStore('dailyMetric', {
  state: () => ({
    storeDailyMetric: null
  }),
  actions: {
    async loadHealthProfile() {
      try {
        const userStore = useUserStore()

        headers.headers.Authorization = `Bearer ${userStore.token}`
        const data = await getData(API_URL + '/HealthProfile', headers)

        this.storeHealthProfile = data.data.data
        message.success(data.data.userMsg)
      } catch (error) {
        message.error('Error fetching data:' + error, 3)
      }
    },
    async getDailyMetricToday() {
      try {
        const userStore = useUserStore()
        headers.headers.Authorization = `Bearer ${userStore.token}`
        const data = await getData(API_URL + '/detailed/today', headers)
        this.storeDailyMetric = data;
        message.success("Lấy dữ liệu thành công")
      } catch (error) {
        console.log(error)
        message.error('Error fetching data:' + error, 3)
      }
    }
  }
})
