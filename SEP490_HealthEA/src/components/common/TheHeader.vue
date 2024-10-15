<script setup>
import { RouterLink } from 'vue-router'
</script>
<template lang="">
  <div>
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="1"><RouterLink to="/">Home</RouterLink></a-menu-item>
        <a-menu-item key="2"><RouterLink to="/client/login">Client View</RouterLink></a-menu-item>
        <a-menu-item key="3"><RouterLink to="/about">About</RouterLink></a-menu-item>
        <a-menu-item key="4"
          ><RouterLink to="/profileHealth">Hồ Sơ sức khỏe</RouterLink></a-menu-item
        >
        <a-menu-item key="5"
          ><RouterLink to="/profileHealth">Admin View</RouterLink></a-menu-item
        >
        <a-menu-item key="5"
          ><RouterLink @click="logout">Logout</RouterLink></a-menu-item
        >
      </a-menu>
    </a-layout-header>
  </div>
</template>
<script>
import { logout } from '@/service/main'
import { useUserStore } from '@/stores/user'

export default {
  name: 'TheHeader',

  methods: {
    async logout() {
      try{
      const logoutResponse = await logout('http://localhost:9090/identity/auth/logout')
        
        const userStore = useUserStore()
        userStore.logout()
        console.log(userStore)

        alert('Logout successful')
      } catch(error){
        console.log('Login failed:', error )
      }
    },
  }
}


</script>
<style lang=""></style>
