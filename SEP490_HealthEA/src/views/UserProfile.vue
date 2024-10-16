<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { logout } from '@/service/main'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = async () => {
  try {
    await logout('http://localhost:9090/identity/auth/logout')
    userStore.logout()
    console.log(userStore)
    router.push({ name: 'home' })

    alert('Logout successful')
  } catch (error) {
    console.log('Logout failed:', error)
  }
}
</script>

<template>
  <a-layout>
    <a-layout-sider width="200" style="background: #fff">
      <a-menu
        v-model:selectedKeys="selectedKeys2"
        v-model:openKeys="openKeys"
        mode="inline"
        :style="{ height: '100%', borderRight: 0 }"
      >
        <a-menu-item key="-1"><RouterLink to="/userProfile/profile">Hồ sơ người dùng</RouterLink></a-menu-item>
        <a-menu-item key="-1"><RouterLink to="/userProfile/password">Mật khẩu</RouterLink></a-menu-item>
        <a-menu-item key="0"><a @click="handleLogout">Logout</a></a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout style="padding: 0 24px 24px">
      <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
      >
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
