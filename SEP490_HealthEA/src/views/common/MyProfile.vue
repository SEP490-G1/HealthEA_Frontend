<script setup>
import ContentFooter from '@/components/layout/ContentFooter'
import { RouterLink } from 'vue-router'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { ref, h } from 'vue'
</script>
<template lang="">
  <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
  <ContentFooter> <router-view /> </ContentFooter>
</template>

<script>
export default {
  data() {
    return {
      current: ref(['mail']),
      items: ref([
        {
          key: 'profile',
          icon: () => h(MailOutlined),
          label: h(RouterLink, { to: '/myprofile/myInfo' }, 'Thông tin tài khoản'),
          title: 'Hồ Sơ của bạn'
        },
        {
          key: 'notification',
          icon: () => h(AppstoreOutlined),
          label: h(RouterLink, { to: '/myprofile/notification' }, 'Thông báo'),
          title: 'Thông báo của bạn'
        },
        {
          key: 'transaction',
          icon: () => h(SettingOutlined),
          label: h(RouterLink, { to: '/myprofile/password' }, 'Đổi mật khẩu tài khoản'),
          title: 'Đổi mật khẩu của bạn'
        }
      ])
    }
  }
}
</script>
<style scoped>
.card {
  cursor: pointer;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 30px 0;
  justify-content: space-between;
  border: 1px solid #ccc;
  transition: box-shadow 0.3s;
}
.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.normal-card {
  color: #48cd93;
  font-weight: bold;
}
.warning-card {
  color: rgb(252, 184, 0);
  font-weight: bold;
}
.danger-card {
  color: #e50031;
  font-weight: bold;
}
.gray-card {
  color: #747474;
  font-weight: bold;
}
.main-container {
  justify-content: center;
}
</style>
