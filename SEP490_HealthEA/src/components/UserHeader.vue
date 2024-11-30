<template>
  <div>
    <div v-if="userStorez && userStorez.auth">
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link" @click.prevent>
          <a-badge :dot="hasUnreadNotifications" :offset="[0, 5]">
            <a-avatar
              :src="userStorez.imageSrc"
              size="large"
              :style="{ backgroundColor: color, verticalAlign: 'middle' }"
            >
              {{
                this.userStorez === null ? "" :
                this.userStorez.userLastName == null
                  ? this.userStorez.userFirstName
                  : this.userStorez.userLastName
              }}
            </a-avatar>
          </a-badge>
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
              <a-badge :dot="hasUnreadNotifications" :offset="[10, 0]">
                <a @click="viewNotifications">Notification</a>
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
      <a-button
        type="primary"
        shape="round"
        style="margin-right: 10px"
        @click="gotoLogin"
      >
        Login now
      </a-button>
      <a-button shape="round" @click="gotoRegister"> Register </a-button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import AlertOutlined from '@ant-design/icons-vue';
import axios from 'axios';
import { notificationState } from '@/stores/NotificationStore';
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const API_URL = import.meta.env.VITE_API_URL_DOTNET

export default {
  setup() {
    const userStore = useUserStore();
    return { userStore, notificationState };
  },
  data() {
    return {
      userStorez: ref(this.userStore.user),
      varCheck: ref(this.userStore.token != null),
      color: ref(colorList[0]),
      hasUnreadNotifications: false,
      notifInterval: null
    };
  },
  watch: {
    async 'userStore.token'() {
      if (this.userStore.token !== null){
        await checkNotifications()
      }
      console.log(this.userStore.token)
      const response = await this.userStore.getUser();
      if (response == undefined) {
        this.userStorez = { auth: false };
        return;
      }
      this.userStorez = response;
    },
    async 'notificationState.hasUnread'() {
      console.log("Notification Received?")
      this.hasUnreadNotifications = true
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
      clearInterval(this.notifInterval);
    }
  },
  components() {
    AlertOutlined;
  },
  methods: {
    async checkNotifications() {
      try {
        if (this.userStore.token === null){
          return
        }
        const userStore = useUserStore()
        const response = await axios.get(`${API_URL}/api/Notification/any`, {
          headers: {
            Authorization: `Bearer ${userStore.token}`
          }
        });
        this.hasUnreadNotifications = response.data.result === true;
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    },
    gotoLogin() {
      this.$router.push('/client/login');
    },
    gotoRegister() {
      this.$router.push('/client/register');
    },
    logOut() {
      this.userStore.Logout();
      this.varCheck = false;
      this.$router.push('/client/login');
    },
    moveMyProfile() {
      this.$router.push('/myprofile');
    },
    viewNotifications() {
      this.$router.push('/notifications');
    },
  },
};
</script>

<style lang=""></style>
