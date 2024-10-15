import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    token: '',
    role: '',
    auth: false
  }),

  actions: {
    async logout() {
      this.name = ''
      this.token = ''
      this.role = ''
      this.auth = false
    },
    async login(name, token, auth) {
      try {
        this.name = name
        this.token = token
        this.auth = auth
      } catch (error) {
        console.error(error)
        return error
      }
    },
    async getInfo(role) {
      try {
        this.role = role
      } catch (error) {
        console.error(error)
        return error
      }
    }
  }
})