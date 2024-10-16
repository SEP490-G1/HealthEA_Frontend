<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
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
          <RouterLink to="/userProfile">Profile</RouterLink>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
  </div>
</template>

<style lang=""></style>