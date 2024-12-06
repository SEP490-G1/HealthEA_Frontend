<template>
  <div>
    <a-drawer v-model:open="open" class="custom-class" title="Đổi ảnh đại diện" placement="right">
      <a-upload
        v-model:file-list="fileList"
        list-type="picture-card"
        :before-upload="beforeUpload"
        @preview="handlePreview"
      >
        <div v-if="fileList.length < 1">
          <plus-outlined />
          <div style="margin-top: 8px">Upload</div>
        </div>
      </a-upload>
      (Chỉ cho ảnh png, và jpg)<br />
      <a-button
        type="primary"
        class="submit-button"
        :loading="loading"
        :disabled="loading"
        @click="handleSubmit"
      >
        Cập nhật avatar
      </a-button>
    </a-drawer>
    <a-typography-title style="margin: 40px" :level="2">Thông tin tài khoản</a-typography-title>
    <div style="display: flex">
      <div
        style="width: 50%; margin: 30px; display: flex; flex-direction: column; align-items: center"
      >
        <a-image-preview-group>
          <a-image
            style="border-radius: 100%"
            :width="400"
            :height="400"
            :src="
              formState.avatar == null
                ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJgCpoJWxPrW-qqRTgNA_mwv3DrikuJ4e3cA&s'
                : formState.avatar
            "
          />
        </a-image-preview-group>
        <a-button @click="drawerClose" type="primary" style="width: 300px; margin: 30px"
          >Đổi avatar</a-button
        >
      </div>
      <div style="margin: 30px">
        <a-form ref="formRef" :model="formState" :rules="rules">
          <a-row>
            <a-col :span="24" style="display: flex">
              <a-form-item label="Họ và tên" name="userFirstName" style="width: 200px">
                <a-input v-model:value="formState.userFirstName" placeholder="Nhập họ và tên" />
              </a-form-item>
              <a-form-item label="" name="userLastName">
                <a-input v-model:value="formState.userLastName" placeholder="Nhập họ và tên" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row>
            <a-col :span="12">
              <a-form-item label="Giới tính" name="gender">
                <a-select v-model:value="formState.gender" placeholder="Chọn giới tính">
                  <a-select-option :value="true">Nam</a-select-option>
                  <a-select-option :value="false">Nữ</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row>
            <a-col :span="12">
              <a-form-item label="Ngày sinh" name="dob">
                <a-date-picker
                  v-model:value="formState.dob"
                  placeholder="Chọn ngày sinh"
                  format="DD/MM/YYYY"
                />
                <!-- <input type="date" v-model="formState.dob" placeholder="Chọn ngày sinh" /> -->
              </a-form-item>
            </a-col>
          </a-row>

          <a-row>
            <a-col :span="24">
              <a-form-item label="Email" name="email">
                <a-input v-model:value="formState.email" placeholder="Nhập email" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row>
            <a-col>
              <a-form-item label="Số điện thoại" name="phone">
                <a-input v-model:value="formState.phone" placeholder="Nhập số điện thoại" />
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
  </div>
</template>

<script>
import { PlusOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'
import { message, Upload } from 'ant-design-vue'
import axios from 'axios'
import { ref } from 'vue'
import dayjs from 'dayjs'
const API_URL = import.meta.env.VITE_API_URL_DOTNET

export default {
  components: { PlusOutlined },
  data() {
    return {
      imageAVA: ref({}),
      loading: ref(false),
      fileList: ref([]),
      open: ref(false),
      idUpdate: '',
      formState: {
        userFirstName: '',
        userLastName: '',
        gender: '',
        dob: '',
        email: '',
        phone: ''
      },
      previewImage: '',
      previewVisible: '',
      previewTitle: '',
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
    beforeUpload(file) {
      const isPNG = file.type === 'image/png'
      const isJPG = file.type === 'image/jpeg'
      if (!(isPNG || isJPG)) {
        message.error(`Chỉ chấp nhận file png và jpg`)
      }
      return isPNG || isJPG || Upload.LIST_IGNORE
    },
    async handleSubmit() {
      if (this.fileList.length === 0) {
        message.warning('Please upload at least one image!')
        return
      }
      const formData1 = new FormData()

      // Append each file to the FormData object
      this.fileList.forEach((file) => {
        if (file.originFileObj) {
          formData1.append('Files', file.originFileObj)
        }
      })

      // Set loading to true to disable the button and show loading indicator
      this.loading = true
      const uploadMessage1 = message.loading('Uploading images...', 0)
      try {
        const objUpload = await axios.post(`${API_URL}/api/Images`, formData1, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(objUpload.data[0].imageUrl)
        this.formState.avatar = objUpload.data[0].imageUrl
        await this.updateUserProfile()
        await this.loadData()
        this.open = false
        uploadMessage1()
        message.success('Upload successful!')
      } catch (err) {
        uploadMessage1() // Hide the loading message
        message.error('Upload failed. Please try again.')
        console.error('Upload failed:', err)
        return
      }
    },

    drawerClose() {
      this.open = !this.open
    },
    async loadData() {
      const userStore = useUserStore()
      const myInfo = ref({})
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_JAVA}/identity/users/myinfo`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userStore.token}`
            }
          }
        )
        myInfo.value = response.data.result
        this.formState.avatar = myInfo.value.avatar
        this.idUpdate = myInfo.value.id
        this.formState.userFirstName = myInfo.value.firstName
        this.formState.userLastName = myInfo.value.lastName
        this.formState.gender = myInfo.value.gender
        this.formState.dob = dayjs(myInfo.value.dob)
        this.formState.email = myInfo.value.email
        this.formState.phone = myInfo.value.phone
      } catch (error) {
        message.error('Gặp lỗi khi lấy thông tin người dùng!', 10)
      }
    },
    async updateUserProfile() {
      const userStore = useUserStore()
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL_JAVA}/identity/users/${this.idUpdate}`,
          {
            avatar: this.formState.avatar,
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
        message.success('Cập nhật thông tin thành công!', 10)
        console.log(response.data)
      } catch (error) {
        console.error('Lỗi cập nhật thông tin:', error)
        alert('Có lỗi xảy ra trong quá trình cập nhật thông tin')
      }
    }
  }
}
</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
}
</style>
