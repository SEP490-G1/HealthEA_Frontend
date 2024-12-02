<template>
  <div>
    <a-typography-title :level="2">Đổi mật khẩu</a-typography-title>
    <div>
      <a-form ref="formRef" :model="passwordFormState" :rules="passwordRules">
        <a-row>
          <a-col :span="12">
            <a-form-item label="Mật khẩu hiện tại" name="currentPassword">
              <a-input
                :bordered="false"
                type="password"
                v-model:value="passwordFormState.currentPassword"
                placeholder="Nhập mật khẩu hiện tại"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item label="Mật khẩu mới" name="newPassword">
              <a-input
                :bordered="false"
                type="password"
                v-model:value="passwordFormState.newPassword"
                placeholder="Nhập mật khẩu mới"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item label="Xác nhận mật khẩu mới" name="confirmPassword">
              <a-input
                :bordered="false"
                type="password"
                v-model:value="passwordFormState.confirmPassword"
                placeholder="Xác nhận mật khẩu mới"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-button type="primary" @click="updatePassword">Cập nhật mật khẩu</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { ref, onMounted } from 'vue'

export default {
  data() {
    return {
      idUpdate: '',
      passwordFormState: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      passwordRules: {
        currentPassword: [{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }],
        newPassword: [{ required: true, message: 'Vui lòng nhập mật khẩu mới' }],
        confirmPassword: [
          { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
          { validator: this.validatePasswordConfirm }
        ]
      }
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    validatePasswordConfirm(rule, value) {
      if (value !== this.passwordFormState.newPassword) {
        return Promise.reject('Mật khẩu xác nhận không khớp!')
      }
      return Promise.resolve()
    },

    async loadData() {
      const userStore = useUserStore()
      const myInfo = ref({})
      try {
        const response = await axios.get('http://160.25.233.36:9090/identity/users/myinfo', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userStore.token}`
          }
        })
        myInfo.value = response.data.result
        this.idUpdate = myInfo.value.id
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error)
      }
    },

    // Cập nhật mật khẩu
    async updatePassword() {
      const userStore = useUserStore()
      if (this.passwordFormState.newPassword !== this.passwordFormState.confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!')
        return
      }
      try {
        const response = await axios.put(
          `http://160.25.233.36:9090/identity/users/changePass/${this.idUpdate}`,
          {
            oldPass: this.passwordFormState.currentPassword,
            newPass: this.passwordFormState.newPassword
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userStore.token}`
            }
          }
        )
        alert('Đổi mật khẩu thành công')
      } catch (error) {
        alert('Có lỗi xảy ra trong quá trình thay đổi mật khẩu')
      }
    }
  }
}
</script>
