<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div>
    <div style="display: flex; width: 100%">
      <div style="width: 120px;">
        <RouterLink to="/" class="text-decoration-none" style="top: 10px"><img src="@/assets/LOGOHD@3x.png" width="100%"></RouterLink>
      </div>
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }" style="width: 100%">
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
          <div class="flex horizon">
            <UserHeader v-model:role="role" />
          </div>
        </a-flex>
      </a-menu>
    </div>
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
      { path: '/about', text: 'Về chúng tôi' }
    ])
    this.checkRole()
  },
  methods: {
    async checkRole() {
      const store = useUserStore()
      if (store.token === null) {
        this.listHeader = [
          { path: '/about', text: 'Về chúng tôi' }
        ]
        return
      }
      try {
        const role = await (await store.getUser()).role
        if (role == 'CUSTOMER') {
          this.listHeader.push({ path: '/profileHealth', text: 'Hồ sơ sức khỏe' })
          this.listHeader.push({ path: '/dailymetric', text: 'Chỉ số sức khỏe định kỳ' })
          this.listHeader.push({ path: '/remind/calendar', text: 'Lịch của bạn' })
          this.listHeader.push({ path: '/appointments', text: 'Lịch hẹn khám của bạn' })
          this.listHeader.push({ path: '/listDoctor', text: 'Danh sách bác sĩ' })
          this.listHeader.push({ path: '/news', text: 'Tin tức' })
          // this.listHeader.push({ path: '/call', text: 'Video Call' })
        }
        if (role == 'ADMIN') {
          this.listHeader.push({ path: '/admin/UserManagement', text: 'Quản lý tài khoản' })
          this.listHeader.push({ path: '/admin/DoctorManagement', text: 'Quản lý bác sĩ' })
          this.listHeader.push({ path: '/admin/reports', text: 'Quản lý báo cáo' })
          this.listHeader.push({ path: '/admin/news/create', text: 'Quản lý tin tức' })
        }
        if (role == 'DOCTOR') {
          this.listHeader.push({ path: '/doctor/apoinemnt', text: 'Xem lịch hẹn' })
          this.listHeader.push({ path: '/doctors/me', text: 'Xem thông tin' })
          // this.listHeader.push({ path: '/doctors/call', text: 'Video Call' })
        }
      } catch (error) {
        this.listHeader = [
          { path: '/about', text: 'Về chúng tôi' }
        ]
      }
      if (this.listHeader.length <= 0) {
        this.listHeader = [
          { path: '/about', text: 'Về chúng tôi' }
        ]
      }
    }
  }
}
</script>
<style lang=""></style>
