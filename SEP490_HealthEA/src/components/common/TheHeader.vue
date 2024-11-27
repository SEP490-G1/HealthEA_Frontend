<script setup>
import TheMainHeader from '@/components/common/TheMainHeader.vue'
</script>
<template>
  <div>
    <a-layout-header class="header">
      <TheMainHeader />
    </a-layout-header>
  </div>
</template>
<script>

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
          { path: '/admin/UserManagement', text: 'Quản lý người dùng' },
          { path: '/dailymetric', text: 'Chỉ số sức khỏe định kỳ' },
          { path: '/doctors', text: 'Danh sách bác sĩ' },
          { path: '/news', text: 'Tin tức' }
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
