// import { defineStore } from 'pinia'
// import { getToken, messaging } from 'firebase/messaging'
// import axios from 'axios'
// const vapidKeyz = {
//   vapidKey:
//     'BMpBVwTRbkxvoJzImRosbrGc8EiFhx2tFU1ezoY7VjdjxAygDzXWYrbm_iDpnhMdFXFu1U0LNqnXUQf1g1TXfmk'
// }

// export const noticeStore = defineStore('noticeStore', {
//   state: () => ({
//     listNotice: []
//   }),
//   actions: {
//     async registerDeviceToken() {
//       const permission = await Notification.requestPermission()
//       if (permission === 'granted') {
//         try {
//           // Obtain the device token
//           const deviceToken = await getToken(messaging, {
//             vapidKey:
//               'BMpBVwTRbkxvoJzImRosbrGc8EiFhx2tFU1ezoY7VjdjxAygDzXWYrbm_iDpnhMdFXFu1U0LNqnXUQf1g1TXfmk'
//           })

//           if (deviceToken) {
//             console.log('Device Token:', deviceToken)

//             // Send deviceToken to backend to register
//             await axios.post('http://localhost:5217/api/Notification/register-token', {
//               userId: '47863E73-E00C-4EBF-8F2A-1E8753359C4D',
//               deviceToken: deviceToken,
//               deviceType: 'web'
//             })

//             console.log('Device token registered successfully.')
//           } else {
//             console.log('No registration token available.')
//           }
//         } catch (error) {
//           console.error('Error retrieving device token:', error)
//         }
//       } else {
//         console.log('Notification permission denied.')
//       }
//     },
//     async requestPermissionAndGetToken() {
//       try {
//         const permission = await Notification.requestPermission()
//         if (permission === 'granted') {
//           const currentToken = await getToken(messaging, vapidKeyz)
//           if (currentToken) {
//             console.log('Device Token:', currentToken)
//             // Gửi token lên backend để lưu trữ nếu cần
//           } else {
//             console.log('No registration token available.')
//           }
//         } else {
//           console.log('Permission denied for notifications.')
//         }
//       } catch (err) {
//         console.log('An error occurred while retrieving token: ', err)
//       }
//     }
//   }
// })
