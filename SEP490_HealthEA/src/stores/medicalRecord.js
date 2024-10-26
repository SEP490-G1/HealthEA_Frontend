import { defineStore } from 'pinia'
import { getData, postData, deleteData } from '@/service/main'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'
const API_URL = 'http://localhost:5217/api/customer'

const headers = {
  // Các tùy chọn cấu hình khác
  headers: {
    accept: '*/*',
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
    async getHealthProfileByID(id) {
      try {
        const userStore = useUserStore()
        headers.headers.Authorization = `Bearer ${userStore.token}`
        const data = await getData(API_URL + '/HealthProfile/infomation/' + id, headers)
        message.success(data.data.userMsg)
        return data.data.data
      } catch (error) {
        console.log(error)
        message.error('Error fetching data:' + error, 3)
      }
    },
    async deleteHealthProfile(id) {
      try {
        const userStore = useUserStore()
        headers.headers.Authorization = `Bearer ${userStore.token}`
        const data = await deleteData(API_URL + '/HealthProfile/' + id, headers)
        this.storeHealthProfile = data.data.data
        message.success(data.data.userMsg)
      } catch (error) {
        console.log(error)
        message.error('Error fetching data:' + error, 3)
      }
    },
    async addNewHealthProfile(body) {
      try {
        const userStore = useUserStore()
        console.log(body)

        headers.headers.Authorization = `Bearer ${userStore.token}`
        const data = await postData(API_URL + '/HealthProfile', body, headers)
        this.storeHealthProfile = data.data.data
        message.success(data.data.userMsg)
      } catch (error) {
        console.log(error)
        message.error('Error fetching data:' + error, 3)
      }
    },
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
    }
  }
})
