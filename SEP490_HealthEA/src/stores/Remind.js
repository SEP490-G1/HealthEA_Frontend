import { defineStore } from 'pinia'
import { getData, postData } from '@/service/main'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'
const API_URL = 'http://localhost:5217/api/Events'

const headers = {
  // Các tùy chọn cấu hình khác
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json'
  }
}
export const useRemindStore = defineStore('remindStore', {
  state: () => ({
    listEvent: null
  }),
  actions: {
    async AddNewRemind(body) {
      try {
        const userStore = useUserStore()

        headers.headers.Authorization = `Bearer ${userStore.token}`
        const data = await postData(API_URL, body, headers)

        return await data
      } catch (error) {
        console.log(error)
        message.error('Lay du lieu loi', 3)
      }
    },
    async getListEventRange(startDate, endDate) {
      try {
        const userStore = useUserStore()

        headers.headers.Authorization = `Bearer ${userStore.token}`
        const data = await getData(
          API_URL + `/eventList?startDate=${startDate}&endDate=${endDate}`,
          headers
        )

        return await data.data
      } catch (error) {
        console.log(error)
        message.error('Lay du lieu loi', 3)
      }
    }
  }
})