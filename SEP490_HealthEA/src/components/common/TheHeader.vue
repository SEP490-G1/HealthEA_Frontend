<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { logout } from '@/service/main'

const userStore = useUserStore() // Lấy Pinia store từ setup

const handleLogout = async () => {
  try {
    await logout('http://localhost:9090/identity/auth/logout')
    userStore.logout()
    console.log(userStore)
    alert('Logout successful')
  } catch (error) {
    console.log('Logout failed:', error)
  }
}
</script>
<template lang="">
  <div>
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="1"><RouterLink to="/">Home</RouterLink></a-menu-item>
        <a-menu-item key="2"><RouterLink to="/client/login">Client View</RouterLink></a-menu-item>
        <a-menu-item key="3"><RouterLink to="/about">About</RouterLink></a-menu-item>
        <a-menu-item key="4">
          <RouterLink to="/profileHealth" v-if="userStore.auth">Hồ Sơ sức khỏe</RouterLink>
        </a-menu-item>
        <a-menu-item key="5" v-if="userStore.auth">
          <RouterLink to="/profileHealth">Admin View</RouterLink>
        </a-menu-item>
        <a-menu-item key="6" v-if="userStore.auth">
          <a @click="handleLogout">Logout</a>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
  </div>
</template>
<!-- <script>
import { logout } from '@/service/main'


export default {
  name: 'TheHeader',
  created(){
    const userStore = useUserStore()
  },
  methods: {
    async logout() {
      try {
        const logoutResponse = await logout('http://localhost:9090/identity/auth/logout')

        const userStore = useUserStore()
        userStore.logout()
        console.log(userStore)

        alert('Logout successful')
      } catch (error) {
        console.log('Login failed:', error)
      }
    },
  }
}
</script> -->


<style lang=""></style>