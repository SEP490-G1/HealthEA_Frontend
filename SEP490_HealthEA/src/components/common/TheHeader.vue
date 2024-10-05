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
      </a-menu>
    </a-layout-header>
  </div>
</template>
<script>
export default {
  name: 'TheHeader'
}
</script>
<style lang=""></style>
