<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div>
    <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
      <a-flex style="padding: 0 10px; width: 100%" justify="space-between">
        <div>
          <a-menu-item
            v-for="(item, index) in listHeader"
            :class="item.path == pathActive ? 'ant-menu-item-selected' : ''"
            :key="index"
          >
            <RouterLink class="text-decoration-none" :to="item.path">{{ item.text }}</RouterLink>
          </a-menu-item>
        </div>
        <UserHeader v-model:role="role" />
      </a-flex>
    </a-menu>
  </div>
</template>
<script>
import UserHeader from '../UserHeader.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
export default {
  data() {
    return {
      storeUser: useUserStore(),
      pathActive: '',
      role: ref(''),
      listHeader: ref([])
    }
  },
  watch: {
    async 'storeUser.token'() {
      this.checkRole()
    }
  },
  mounted() {
    this.listHeader = ref([
      { path: '/', text: 'Trang chủ' },
      { path: '/about', text: 'Về chúng tôi' }
    ])
    this.checkRole()
  },
  methods: {
    async checkRole() {
      const store = useUserStore()
      try {
        const role = await (await store.getUser()).role
        if (role == 'CUSTOMER') {
          this.listHeader.push({ path: '/profileHealth', text: 'Hồ sơ sức khỏe' })
          this.listHeader.push({ path: '/dailymetric', text: 'Chỉ số sức khỏe định kỳ' })
          this.listHeader.push({ path: '/remind/calendar', text: 'Lịch của bạn' })
          this.listHeader.push({ path: '/listDoctor', text: 'Danh sách bác sĩ' })
          this.listHeader.push({ path: '/news', text: 'Tin tức' })
          this.listHeader.push({ path: '/call', text: 'Video Call' })
        }
        if (role == 'ADMIN') {
          this.listHeader.push({ path: '/admin/UserManagement', text: 'Quản lý tài khoản' })
          this.listHeader.push({ path: '/admin/DoctorManagement', text: 'Quản lý bác sĩ' })
        }
        if (role == 'DOCTOR') {
          this.listHeader.push({ path: '/doctor/apoinemnt', text: 'Xem lịch hẹn' })
          this.listHeader.push({ path: '/doctors/me', text: 'Xem thông tin' })
          this.listHeader.push({ path: '/doctors/call', text: 'Video Call' })
        }
      } catch (error) {
        this.listHeader = [
          { path: '/', text: 'Trang chủ' },
          { path: '/about', text: 'Về chúng tôi' }
        ]
      }
    }
  }
}
</script>
<style lang=""></style>
