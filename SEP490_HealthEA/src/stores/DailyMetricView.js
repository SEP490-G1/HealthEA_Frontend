import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import { deleteData, getData, patchData } from '@/service/main'
import { useUserStore } from '@/stores/user'
const API_URL = 'http://localhost:5217/api/DailyMetric'

const headers = {
  // Các tùy chọn cấu hình khác
  headers: {
    'Content-Type': 'application/json'
  }
}
export const useDailyMetricStore = defineStore('dailyMetric', {
  state: () => ({
    storeDailyMetric: null
  }),
  actions: {
    async saveToday(body) {
      try {
        const userStore = useUserStore()

        headers.headers.Authorization = `Bearer ${userStore.token}`
        const data = await patchData(API_URL + '/today', body, headers)
        if (data.status == 204) {
          message.success('Cập nhật thành công!')
          return data
        }
      } catch (error) {
        message.error('Error fetching data:' + error, 3)
      }
    },
    async getDailyMetricToday() {
      try {
        const userStore = useUserStore()
        headers.headers.Authorization = `Bearer ${userStore.token}`
        const data = await getData(API_URL + '/detailed/today', headers)
        this.storeDailyMetric = data
        message.success('Lấy dữ liệu thành công')
      } catch (error) {
        console.log(error)
        message.error('Error fetching data:' + error, 3)
      }
    },
    async deleteDailyMetricToday(id) {
      try {
        const userStore = useUserStore()
        headers.headers.Authorization = `Bearer ${userStore.token}`
        const a = await deleteData(API_URL + `/${id}`, headers)
        message.success('Xóa dữ liệu thành công')
        return a
      } catch (error) {
        console.log(error)
        message.error('Xóa dữ liệu thất bại' + error, 3)
      }
    },
    async getRangeDailyMetric(startDate, endDate) {
      try {
        const userStore = useUserStore()
        headers.headers.Authorization = `Bearer ${userStore.token}`
        const data = await getData(
          API_URL + `/me/range?startDate=${startDate}&endDate=${endDate}`,
          headers
        )
        message.success('Lấy dữ liệu thành công')
        return data
      } catch (error) {
        console.log(error)
        message.error('Error fetching data:' + error, 3)
      }
    }
  }
})
