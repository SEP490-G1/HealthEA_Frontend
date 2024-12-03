<template>
  <div>
    <a-typography-title :level="2">Thông tin tài khoản</a-typography-title>
    <div>
      <a-form ref="formRef" :model="formState" :rules="rules">
        <a-row>
          <a-col :span="12" style="display: flex">
            <a-form-item label="Họ và tên" name="userFirstName" style="width: 200px">
              <a-input
                :bordered="false"
                v-model:value="formState.userFirstName"
                placeholder="Nhập họ và tên"
              />
            </a-form-item>
            <a-form-item label="" name="userLastName">
              <a-input
                :bordered="false"
                v-model:value="formState.userLastName"
                placeholder="Nhập họ và tên"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="3">
            <a-form-item label="Giới tính" name="gender">
              <a-select
                :bordered="false"
                v-model:value="formState.gender"
                placeholder="Chọn giới tính"
              >
                <a-select-option value="true">Nam</a-select-option>
                <a-select-option value="false">Nữ</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item label="Ngày sinh" name="dob">
              <!-- <a-date-picker
                :bordered="false"
                v-model:value="formState.dob"
                placeholder="Chọn ngày sinh"
              /> -->
              <input type="date" v-model="formState.dob" placeholder="Chọn ngày sinh" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item label="Email" name="email">
              <a-input :bordered="false" v-model:value="formState.email" placeholder="Nhập email" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item label="Số điện thoại" name="phone">
              <a-input
                :bordered="false"
                v-model:value="formState.phone"
                placeholder="Nhập số điện thoại"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-button type="primary" @click="updateUserProfile">Cập nhật thông tin</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { ref } from 'vue'

export default {
  data() {
    return {
      idUpdate: '',
      formState: {
        userFirstName: '',
        userLastName: '',
        gender: '',
        dob: '',
        email: '',
        phone: ''
      },
      rules: {
        userFirstName: [{ required: true, message: 'Vui lòng nhập họ' }],
        userLastName: [{ required: true, message: 'Vui lòng nhập tên' }],
        email: [{ required: true, type: 'email', message: 'Email không hợp lệ' }],
        phone: [{ required: true, message: 'Vui lòng nhập số điện thoại' }],
        gender: [{ required: true, message: 'Vui lòng chọn giới tính' }]
      }
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
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
        console.log('myInfo:', myInfo.value)

        this.idUpdate = myInfo.value.id
        this.formState.userFirstName = myInfo.value.firstName || ''
        this.formState.userLastName = myInfo.value.lastName || ''
        this.formState.gender = myInfo.value.gender || ''
        this.formState.dob = myInfo.value.dob || ''
        this.formState.email = myInfo.value.email || ''
        this.formState.phone = myInfo.value.phone || ''
      } catch (error) {
        console.error('Lỗi lấy thông tin người dùng:', error)
      }
    },
    async updateUserProfile() {
      const userStore = useUserStore()
      try {
        const response = await axios.put(
          `http://160.25.233.36:9090/identity/users/${this.idUpdate}`,
          {
            firstName: this.formState.userFirstName,
            lastName: this.formState.userLastName,
            gender: this.formState.gender,
            dob: this.formState.dob,
            email: this.formState.email,
            phone: this.formState.phone
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userStore.token}`
            }
          }
        )
        alert('Cập nhật thông tin thành công')
        console.log(response.data)
      } catch (error) {
        console.error('Lỗi cập nhật thông tin:', error)
        alert('Có lỗi xảy ra trong quá trình cập nhật thông tin')
      }
    }
  }
}
</script>
