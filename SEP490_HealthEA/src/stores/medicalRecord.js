import { defineStore } from 'pinia'
import { getData, postData, deleteData, patchData, putData } from '@/service/main'
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
    async updateDP(id, body) {
      const userStore = useUserStore()
      headers.headers.Authorization = `Bearer ${userStore.token}`
      console.log(id);
      const data = await putData(API_URL + `/DocumentProfile?id=${id}`, body, headers)
      return data
    },
    async getOneDP(id) {
      const userStore = useUserStore()
      headers.headers.Authorization = `Bearer ${userStore.token}`
      const data = await getData(API_URL + `/DocumentProfile/${id}`, headers)
      return data
    },
    // http://localhost:5217/api/customer/DocumentProfile
    async addNewDP(body) {
      const userStore = useUserStore()
      headers.headers.Authorization = `Bearer ${userStore.token}`
      const data = await postData(API_URL + `/DocumentProfile`, body, headers)
      return data
    },
    // http://localhost:5217/api/customer/DocumentProfile/3fa85f64-5717-4562-b3fc-2c963f66afa6/1
    async getListAType(id, type) {
      const userStore = useUserStore()
      headers.headers.Authorization = `Bearer ${userStore.token}`
      const data = await getData(API_URL + `/DocumentProfile/${id}/${type}`, headers)
      return data
    },
    async changeShare(id, body) {
      try {
        const userStore = useUserStore()
        headers.headers.Authorization = `Bearer ${userStore.token}`
        const data = await patchData(API_URL + '/HealthProfile/share/' + id, body, headers)
        this.storeHealthProfile = data.data.data
        message.success(data.data.userMsg)
      } catch (error) {
        console.log(error)
        message.error('Error fetching data:' + error, 3)
      }
    },

    async getHealthProfileByID(id) {
      const userStore = useUserStore()
      headers.headers.Authorization = `Bearer ${userStore.token}`
      const data = await getData(API_URL + '/HealthProfile/infomation/' + id, headers)
      return data.data.data
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
