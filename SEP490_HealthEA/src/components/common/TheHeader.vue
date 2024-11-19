<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
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
      listHeader: ref([
        { path: '/', text: 'Trang chủ' },
        { path: '/profileHealth', text: 'Hồ sơ sức khỏe' },
        { path: '/about', text: 'Về chúng tôi' },
        { path: '/admin/UserManagement', text: 'Quản lý người dùng' },
        { path: '/dailymetric', text: 'Chỉ số sức khỏe định kỳ' },
        { path: '/remind/calendar', text: 'Lịch của bạn' }
      ])
    }
  },
  mounted() {},
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
