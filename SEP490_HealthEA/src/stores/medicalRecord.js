import { defineStore } from 'pinia'
import { getData } from '@/service/main'
// import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'
const API_URL = 'http://localhost:5217/api/Customer/HealthProfile'

const headers = {
  // Các tùy chọn cấu hình khác
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidXNlcm5hbWUiLCJqdGkiOiJlOTFiZDczZS0xOGUwLTQ1ZWQtYjA5ZS00ZThlZDA2YjNlNzgiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDVVNUT01FUiIsImV4cCI6MjMyOTQyODA3MSwiaXNzIjoiZHVvbmcxMi5jb20iLCJhdWQiOiJkdW9uZzEyLmNvbSJ9.Bl-iKNtu8RYQBVzRX5tQnzA5CHZN8SQsuWds-FDg5BI`
  }
}
export const useMedicalRecordStore = defineStore('medicalRecord', {
  state: () => ({
    storeHealthProfile: null
  }),
  getters: {
    getHealthProfile(state) {
      return state.storeHealthProfile
    }
  },
  actions: {
    async loadHealthProfile() {
      try {
        const data = await getData(API_URL, headers)
        console.log(data);
        var dataRes = data.data
        this.storeHealthProfile = dataRes.data
        message.success( dataRes.userMsg, 3)
      } catch (error) {
        console.log(error)
        message.error('Error fetching data:' + error, 3)
      }
    }
  }
})
