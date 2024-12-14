<template lang="">
  <div class="container">
    <a-typography-title>Đăng nhập</a-typography-title>
    <a-typography-title style="margin-top: 0px; margin-bottom: 50px" :level="5"
      >Hoặc bạn có thể đăng ký <RouterLink to="register">tại đây</RouterLink></a-typography-title
    >
    <a-row style="width: 100%; display: flex; flex-direction: column; align-content: center">
      <a-form
        :label-col="this.labelCol"
        :wrapper-col="this.wrapperCol"
        style="width: 35%"
        :model="formState"
        name="basic"
        autocomplete="off"
      >
        <a-form-item
          label="Tên đăng nhập"
          name="username"
          :rules="[{ required: true, message: 'Tài khoản không được để trống!' }]"
        >
          <a-input :status="status.username" v-model:value="this.formState.username" />
        </a-form-item>

        <a-form-item
          label="Mật khẩu"
          name="password"
          :rules="[{ required: true, message: 'Mật khẩu không được để trống!' }]"
        >
          <a-input-password :status="status.password" v-model:value="this.formState.password" />
        </a-form-item>
      </a-form>
      <a-form-item name="remember">
        <a-checkbox
          style="width: 100%; display: flex; justify-content: center"
          v-model:checked="this.formState.remember"
          >Ghi nhớ đăng nhập trên thiết bị này</a-checkbox
        >
      </a-form-item>
      <a-form-item style="width: 100%; background-color: aqua; margin: 0; display: flex">
        <a-button
          size="large"
          style="width: 100%"
          type="primary"
          @click="
            onLoginEvent(this.formState.username, this.formState.password, this.formState.remember)
          "
          >Đăng nhập</a-button
        >
      </a-form-item>
    </a-row>
  </div>
</template>

<script>
import { messaging } from '@/firebase';
import { useUserStore } from '@/stores/user'
import axios from 'axios';
import { getToken } from 'firebase/messaging';
import { ref } from 'vue'
const DOTNET_URL = import.meta.env.VITE_API_URL_DOTNET

export default {
  data() {
    return {
      labelCol: {
        style: {
          width: '120px'
        }
      },
      wrapperCol: {
        span: 18
      },
      formState: ref({
        username: '',
        password: '',
        remember: false
      }),
      status: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async onLoginEvent(username, password, remember) {
      var userStoreLogin = useUserStore()
      var obj = { username, password, remember }

      var response = await userStoreLogin.Login(obj)

      if (response == true) {
        this.$router.push('/')
        await this.registerDeviceToken()
      }
      if (response == 1020) {
        this.$router.push('/client/verifyEmail')
      }
      console.log(response);
      
      return
    },
    async registerDeviceToken() {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        try {
          // Obtain the device token
          const deviceToken = await getToken(messaging, {
            vapidKey:
              'BMpBVwTRbkxvoJzImRosbrGc8EiFhx2tFU1ezoY7VjdjxAygDzXWYrbm_iDpnhMdFXFu1U0LNqnXUQf1g1TXfmk'
          })

          if (deviceToken) {
            console.log('Device Token:', deviceToken)
            const userStore = useUserStore()
            // Send deviceToken to backend to register
            await axios.post(
              `${DOTNET_URL}/api/Notification/register-token`,
              {
                userId: '47863E73-E00C-4EBF-8F2A-1E8753359C4D',
                deviceToken: deviceToken,
                deviceType: 'web'
              },
              {
                headers: {
                  Authorization: `Bearer ${userStore.token}`
                }
              }
            )

            console.log('Device token registered successfully.')
          } else {
            console.log('No registration token available.')
          }
        } catch (error) {
          console.error('Error retrieving device token:', error)
        }
      } else {
        console.log('Notification permission denied.')
      }
    }
  }
}
</script>
<style scope>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
