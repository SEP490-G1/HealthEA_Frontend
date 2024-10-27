<template lang="">
  <div>
    <div v-if="userStore.user.auth">
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link" @click.prevent>
          <a-avatar
            :src="userStore.user.imageSrc"
            size="large"
            :style="{ backgroundColor: color, verticalAlign: 'middle' }"
          >
            {{ userStore.user.userLastName == '' ? userStore.user.userName : userStore.user.userLastName }}
          </a-avatar>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <a href="http://www.taobao.com/">Xem hồ sơ</a>
            </a-menu-item>
            <a-menu-item key="1">
              <a @click="logOut">Đăng Xuất</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div v-if="userStore.user.auth == false">
      <a-button type="primary" shape="round" style="margin-right: 10px" @click="gotoLogin">
        Login now
      </a-button>
      <a-button shape="round" @click="gotoRegister"> Register </a-button>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { LoginOutlined } from '@ant-design/icons-vue'
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']

export default {
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  data() {
    return {
      color: ref(colorList[0])
    }
  },
  components() {
    LoginOutlined
  },
  methods: {
    gotoLogin() {
      this.$router.push('/client/login')
    },
    gotoRegister() {
      this.$router.push('/client/register')
    },
    logOut() {
      this.userStore.Logout()
      this.$router.push('/client/login')
    }
  }
}
</script>
<style lang=""></style>
