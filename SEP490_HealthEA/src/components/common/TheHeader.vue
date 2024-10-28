<script setup>
import { RouterLink } from 'vue-router'
</script>
<template lang="">
  <div>
    <a-layout-header class="header">
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-flex style="padding: 0 10px; width: 100%" justify="space-between">
          <div>
            <a-menu-item
              v-for="(item, index) in listHeader"
              :class="item.path == pathActive ? 'ant-menu-item-selected' : ''"
              :key="index"
            >
              <RouterLink :to="item.path">{{ item.text }}</RouterLink>
            </a-menu-item>
          </div>
          <UserHeader v-model:role="role" />
        </a-flex>
      </a-menu>
    </a-layout-header>
  </div>
</template>
<script>
import UserHeader from '../UserHeader.vue'
import { ref } from 'vue'
// import { useUserStore } from '@/stores/user'

export default {
  name: 'TheHeader',

  data() {
    return {
      pathActive: '',
      role: ref(''),
      listHeader: ref( [
          { path: '/', text: 'Trang chủ' },
          { path: '/profileHealth', text: 'Hồ sơ sức khỏe' },
          { path: '/about', text: 'Về chúng tôi' },
          { path: '/admin/UserManagement', text: 'Quản lý người dùng' }
        ])
    }
  },
  mounted() {
    // switch (this.role) {
    //   case 'CUSTOMER':
    //     this.listHeader = [
    //       { path: '/', text: 'Trang chủ' },
    //       { path: '/profileHealth', text: 'Hồ sơ sức khỏe' },
    //       { path: '/about', text: 'Về chúng tôi' },
    //       { path: '/profile', text: 'Hồ sơ của bạn' }
    //     ]
    //     break
    //   default:
    //     this.listHeader = [
    //       { path: '/', text: 'Trang chủ' },
    //       { path: '/', text: 'Chức năng chính' },
    //       { path: '/', text: 'Về chúng tôi' },
    //       { path: '/', text: 'Liên hệ' }
    //     ]
    //     break
    // }
  },
  watch: {
    $route(to) {
      this.pathActive = to.path
    }
  },
  methods: {
    onClicks() {}
  }
}
</script>
<style lang=""></style>
