import { defineStore } from 'pinia'
import { getData } from '@/service/main'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'
const API_URL = 'http://localhost:5217/api/customer'
const headers = {
  headers: {
    'Content-Type': 'application/json'
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
        const userStore = useUserStore()

        headers.headers.Authorization = `Bearer ${userStore.token}`
        const data = await getData(
          API_URL + '/HealthProfile',

          headers
        )
        console.log(data)
        this.storeHealthProfile = data.data.data
        message.success(data.data.userMsg)
      } catch (error) {
        console.log(error)
        message.error('Error fetching data:' + error, 3)
      }
    }
  }
})
