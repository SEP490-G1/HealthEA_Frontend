import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSmFuZVNtaXRoIiwianRpIjoiNWVmZDdjOWItNDI5NS00NjM4LThiOWYtMmQwY2ZlMTI4NjY0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MjMyODQxNjA4OSwiaXNzIjoiUTEiLCJhdWQiOiJRMSJ9.LtsIsOniGTKAP1Lv_s0IpmRBot8XeOVzon4gI8KanTc',
    role: '',
    auth: true
  }),

  actions: {
    async Logout() {
      this.name = ''
      this.token = ''
      this.auth = false
    },
    async Login(name, token) {
      try {
        this.name = name
        this.token = token
        this.auth = true
      } catch (error) {
        console.error(error)
        // let the form component display the error
        return error
      }
    }
  }
})
