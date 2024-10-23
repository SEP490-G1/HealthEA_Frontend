import { defineStore } from 'pinia'
import { getData } from '@/service/main'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'
const API_URL = 'http://localhost:5217/api/User/HealthProfile'
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
        const data = await getData(
          API_URL,
          {},
          {
            headers: {
              Authorization: 'Bearer ' + userStore.token
            }
          }
        )
        this.storeHealthProfile = data.data.data
        message.success('quá đã pepsi ơi')
      } catch (error) {
        console.log(error)
        message.error('Error fetching data:' + error, 3)
      }
    }
  }
})
