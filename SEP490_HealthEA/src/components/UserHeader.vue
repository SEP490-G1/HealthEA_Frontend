<template>
  <div>
    <div v-if="userStorez.auth">
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link" @click.prevent>
          <a-avatar
            :src="userStorez.imageSrc"
            size="large"
            :style="{ backgroundColor: color, verticalAlign: 'middle' }"
          >
            {{
              userStorez.userLastName == null ? userStorez.userFirstName : userStorez.userLastName
            }}
          </a-avatar>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <a @click="moveMyProfile">Xem hồ sơ</a>
            </a-menu-item>
            <a-menu-item key="1">
              <a href="http://www.taobao.com/">Đổi mật khẩu</a>
            </a-menu-item>
            <a-menu-item key="2">
              <a @click="logOut">Đăng Xuất</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div v-if:="!userStorez.auth">
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
import AlertOutlined from '@ant-design/icons-vue'
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']
export default {
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  data() {
    return {
      userStorez: ref(this.userStore.user),
      varCheck: ref(this.userStore.token != null),
      color: ref(colorList[0])
    }
  },
  watch: {
    async 'userStore.token'() {
      console.log("Change");
      
      const response = await this.userStore.getUser()
      if (response == undefined) {
        this.userStorez = { auth: false }
        return
      }
      this.userStorez = response
    }
  },
  mounted() {},
  components() {
    AlertOutlined
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
      this.varCheck = false
      this.$router.push('/client/login')
    },
    moveMyProfile(){
      this.$router.push('/myprofile')
    }
  }
}
</script>
<style lang=""></style>
