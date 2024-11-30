<!-- @author: thuyht -->
<script setup>
import TheHeader from '@/components/common/TheHeader'
//Firebase
import axios from 'axios'
import { onMounted } from 'vue'
import { getToken, messaging } from './firebase';
import { useUserStore } from './stores/user';

const API_URL = import.meta.env.VITE_API_URL_DOTNET

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope)
    })
    .catch((err) => {
      console.log('Service Worker registration failed:', err)
    })
}

// Function to register device token
async function registerDeviceToken() {
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
        await axios.post(`${API_URL}/api/Notification/register-token`, {
          userId: '47863E73-E00C-4EBF-8F2A-1E8753359C4D',
          deviceToken: deviceToken,
          deviceType: 'web'
        }, {
          headers: {
            Authorization: `Bearer ${userStore.token}`
          }
        })

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

// Automatically get the deviceToken when the component is mounted
onMounted(() => {
})
// import { noticeStore } from './stores/Notice'
</script>

<template>
  <a-layout>
    <!-- Header -->
    <TheHeader />
    <!-- End Header -->
    <RouterView class="layout" />
  </a-layout>
</template>
<script>
export default {
  components: {
    TheHeader
  },
  mounted() {
    // const noti = noticeStore()
    // noti.registerDeviceToken()
  },
  data() {
    return {}
  },
  mounted() {
    this.requestPermissionAndGetToken();
  },
  methods: {
    async requestPermissionAndGetToken() {
      try {
        const permission = await Notification.requestPermission()
        console.log(permission)
        if (permission === 'granted') {
          const currentToken = await getToken(messaging, {
            vapidKey:
              'BMpBVwTRbkxvoJzImRosbrGc8EiFhx2tFU1ezoY7VjdjxAygDzXWYrbm_iDpnhMdFXFu1U0LNqnXUQf1g1TXfmk'
          })
          if (currentToken) {
            console.log('Device Token:', currentToken)
            // Gửi token lên backend để lưu trữ nếu cần
          } else {
            console.log('No registration token available.')
          }
        } else {
          console.log('Permission denied for notifications.')
        }
      } catch (err) {
        console.log('An error occurred while retrieving token: ', err)
      }
    }
  }
}
</script>
<style scoped>
.layout {
  height: calc(100vh - 64px);
}
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>
