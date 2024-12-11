<template>
  <div>
    <div v-if="display == true">
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link" @click.prevent>
          <a-avatar
            :src="userStorez.imageSrc"
            :dot="hasUnreadNotifications"
            size="large"
            :style="{
              border: '1px, solid',
              color: `${getColorOpposite(color)}`,
              backgroundColor: `${stringToHexColor(
                !userStorez.userLastName ? userStorez.userFirstName : userStorez.userLastName
              )}`,
              verticalAlign: 'middle'
            }"
          >
            {{ !userStorez.userLastName ? userStorez.userFirstName : userStorez.userLastName }}
          </a-avatar>
        </a>

        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <a @click="moveMyProfile">Xem hồ sơ</a>
            </a-menu-item>
            <a-menu-item key="1">
              <a @click="changePassword">Đổi mật khẩu</a>
            </a-menu-item>
            <a-menu-item key="2">
              <a-badge :dot="hasUnreadNotifications" :offset="[10, 0]">
                <a @click="viewNotifications">Thông báo</a>
              </a-badge>
            </a-menu-item>
            <a-menu-item key="3">
              <a @click="logOut">Đăng Xuất</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div v-else>
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
import axios from 'axios'
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']
const API_URL = import.meta.env.VITE_API_URL_DOTNET

export default {
  setup() {
    const userStore = useUserStore()
    var display = ref(userStore.user == null ? false : userStore.user.auth)
    return { userStore, display }
  },
  data() {
    return {
      userStorez: ref(this.userStore.user),
      varCheck: ref(this.userStore.token != null),
      color: ref(colorList[0]),
      hasUnreadNotifications: false,
      notifInterval: null
    }
  },
  watch: {
    async 'userStore.user'() {
      this.display = this.userStore.user == null ? false : this.userStore.user.auth
      this.userStorez = this.userStore.user
    }
  },
  mounted() {
    this.checkNotifications()
    // this.notifInterval = setInterval(async () => {
    //   await this.checkNotifications();
    // },10000)
  },
  beforeUnmount() {
    // Clear the interval when the component is destroyed
    if (this.notifInterval) {
      clearInterval(this.notifInterval)
    }
  },
  components() {
    AlertOutlined
  },
  methods: {
    stringToHexColor(str) {
      if (str == null) {
        return '#7265e6'
      }
      // Tạo một số hash đơn giản dựa trên chuỗi đầu vào
      let hash = 0
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
      }

      // Chuyển đổi hash thành một số nguyên dương
      hash = Math.abs(hash)

      // Tạo một màu hex ngẫu nhiên dựa trên hash
      let color = '#'
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff
        color += value.toString(16).padStart(2, '0')
      }
      this.color = color
      return color
    },
    getColorOpposite(hexColor) {
      // Bỏ dấu # nếu có
      hexColor = hexColor.replace('#', '')

      // Chuyển đổi Hex sang RGB
      const r = parseInt(hexColor.substring(0, 2), 16)
      const g = parseInt(hexColor.substring(2, 4), 16)
      const b = parseInt(hexColor.substring(4, 6), 16)
      // Tính màu đối nghịch (đảo ngược các giá trị RGB)
      const oppositeR = 255 - r
      const oppositeG = 255 - g
      const oppositeB = 255 - b

      // Chuyển đổi RGB trở lại Hex
      const oppositeHex = ((1 << 24) + (oppositeR << 16) + (oppositeG << 8) + oppositeB)
        .toString(16)
        .slice(1)

      return `#${oppositeHex}`
    },
    async checkNotifications() {
      try {
        if (this.userStore.token === null) {
          return
        }
        const userStore = useUserStore()
        const response = await axios.get(`${API_URL}/api/Notification/any`, {
          headers: {
            Authorization: `Bearer ${userStore.token}`
          }
        })
        this.hasUnreadNotifications = response.data.result === true
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    },
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
    moveMyProfile() {
      this.$router.push('/myprofile/myInfo')
    },
    viewNotifications() {
      this.$router.push('/myprofile/notification')
    },
    changePassword() {
      this.$router.push('/myprofile/password')
    }
  }
}
</script>

<style lang=""></style>
