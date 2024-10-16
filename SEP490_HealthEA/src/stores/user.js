import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    username: '',
    token: '',
    role: '',
    auth: false
  }),

  actions: {
    async logout() {
      this.id = ''
      this.username = ''
      this.token = ''
      this.role = ''
      this.auth = false
    },
    async login(name, token, auth) {
      try {
        this.username = name
        this.token = token
        this.auth = auth
      } catch (error) {
        console.error(error)
        return error
      }
    },
    async getInfo(id, role) {
      try {
        this.id = id
        this.role = role
      } catch (error) {
        console.error(error)
        return error
      }
    }
  }
})