<script setup>
import ContentFooter from '@/components/layout/ContentFooter'
import CommonLayout from '@/components/medical/ModalCommon'
</script>
<template lang="">
  <ContentFooter>
    <a-typography-title :level="2">Danh sách hồ sơ sức khỏe của bạn</a-typography-title>
    <div style="margin: 10px">
      <a-button type="primary" @click="showModal"><PlusOutlined />Thêm hồ sơ</a-button>
    </div>
    <a-row :gutter="[16, 16]" justify="start">
      <a-col v-for="item in info" :key="item.id" class="gutter-row" :span="6">
        <RouterLink to="/profileHealth/medical_record">
          <a-dropdown :trigger="['contextmenu']">
            <a-card :loading="loading" hoverable style="width: 100%; margin-bottom: 20px">
              <template #title>
                <a-skeleton-input v-if="loading" active />
                <div v-if="!loading" style="display: flex; align-item: flex-end">
                  <div style="display: flex; align-items: flex-end">
                    <FolderFilled
                      v-if="item.sharedStatus == 0"
                      style="font-size: 30px; margin-right: 15px"
                    />
                    <FolderOpenFilled v-else style="font-size: 30px; margin-right: 15px" />
                  </div>
                  <a-typography-title style="margin-bottom: 0px" :level="3">{{
                    item.fullName
                  }}</a-typography-title>
                </div>
              </template>
              <template v-if="!loading" #extra>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link" @click.prevent>
                    More
                    <DownOutlined />
                  </a>
                  <template #overlay v-if="!loading">
                    <a-menu>
                      <a-menu-item @click="Delete(item.id)" key="1">Delete</a-menu-item>
                      <a-menu-item @click="Modified(item.id)" key="2">Modified</a-menu-item>
                      <!-- <a-menu-item key="3">Share</a-menu-item> -->
                    </a-menu>
                  </template>
                </a-dropdown>
              </template>
              <template v-if="!loading" #tabBarExtraContent>
                <a href="#">more</a>
              </template>
              <div style="backgroundcolor: blue">
                <a-typography-text type="secondary" style="display: flex"
                  ><p>Last modified:&nbsp;</p>
                  {{ formatDate(item.lastModifyDate) }}</a-typography-text
                >
              </div>
            </a-card>
            <template #overlay v-if="!loading">
              <a-menu>
                <a-menu-item @click="Delete(item.id)" key="1">Delete</a-menu-item>
                <a-menu-item @click="Modified(item.id)" key="2">Modified</a-menu-item>
                <!-- <a-menu-item key="3">Share</a-menu-item> -->
              </a-menu>
            </template>
          </a-dropdown>
        </RouterLink>
      </a-col>
    </a-row>
    <CommonLayout
      :handleCancel="handleCancel"
      :handleOk="handleOk"
      :open="open"
      title="Tạo mới hồ sơ sức khỏe"
      okText="Tạo mới"
      cancelText="Hủy"
      :width="sizeForm"
    >
      <a-form style="margin: 30px">
        <a-form-item
          label="Tên đầy đủ"
          :rules="[{ required: true, message: 'Please chosse a value' }]"
        >
          <a-input v-model:value="userData.fullName" :status="msgName" />
        </a-form-item>
        <a-form-item
          label="Giới tính"
          :rules="[{ required: true, message: 'Please chosse a value' }]"
        >
          <a-radio-group v-model:value="userData.gender">
            <a-radio value="1">Nữ</a-radio>
            <a-radio value="2">Nam</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="Nơi thường trú">
          <a-input v-model:value="userData.residence" />
        </a-form-item>
        <a-form-item
          label="Ngày tháng năm sinh"
          :rules="[{ required: true, message: 'Please chosse a value' }]"
        >
          <a-date-picker
            v-model:value="userData.dateOfBirth"
            :status="msgdt"
            valueFormat="YYYY-MM-DD"
            format="YYYY-MM-DD"
          />
        </a-form-item>
        <a-form-item label="Ghi chú">
          <a-textarea v-model:value="userData.note" />
        </a-form-item>
        <a-form-item
          label="Chia sẻ hồ sơ với"
          :rules="[{ required: true, message: 'Please chosse a value' }]"
        >
          <a-radio-group v-model:value="userData.sharedStatus">
            <a-radio-button value="3">Tất cả mọi người</a-radio-button>
            <a-radio-button value="2">Tất cả người dùng khác</a-radio-button>
            <a-radio-button value="1">Chỉ bác sĩ</a-radio-button>
            <a-radio-button value="0">Chỉ mình tôi</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </CommonLayout>
  </ContentFooter>
</template>
<script>
import { FolderFilled, FolderOpenFilled, PlusOutlined } from '@ant-design/icons-vue'
import { useMedicalRecordStore } from '@/stores/medicalRecord'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
const store = useMedicalRecordStore()
export default {
  data() {
    return {
      userData: {
        fullName: '',
        gender: '1',
        residence: '',
        dateOfBirth: '', // Assuming you want dob as a property
        note: '',
        sharedStatus: '0'
      },
      msgName: '',
      msgdt: '',
      info: ref[({}, {}, {}, {}, {}, {}, {}, {})],
      loading: true,
      errored: false,
      open: false,
      sizeForm: '1000px'
    }
  },
  methods: {
    async Modified(id) {
      var st = await store.getHealthProfileByID(id)

      console.log(st.gender)
      this.open = true
      this.userData.fullName = st.fullName
      this.userData.gender = `${st.gender}`
      this.userData.residence = st.residence
      this.userData.dateOfBirth = st.dateOfBirth
      this.userData.note = st.note
      this.userData.sharedStatus = `${st.sharedStatus}`

    },
    handleCancel() {
      this.open = false
    },
    validateName(data) {
      var prime = true
      if (!data) {
        this.msgName = 'error'
        prime = false
        console.log('name null')
      }
      return prime
    },
    validateDateTime(data) {
      var prime = true
      if (!data) {
        this.msgdt = 'error'
        prime = false
      }

      return prime
    },
    async Delete(i) {
      console.log(i)
      await store.deleteHealthProfile(i)
      await store.loadHealthProfile()
      this.info = await store.storeHealthProfile
    },
    async handleOk() {
      if (!this.validateName(this.userData.fullName)) {
        console.log(this.userData.fullName)

        return
      }
      if (!this.validateDateTime(this.userData.dateOfBirth)) {
        return
      }
      console.log(this.userData.dateOfBirth)

      await store.addNewHealthProfile(this.userData)
      this.open = false
      await store.loadHealthProfile()
      this.info = await store.storeHealthProfile
    },
    showModal() {
      this.open = true
    },
    formatDate(date) {
      const dateTime = new Date(date)
      const day = dateTime.getDate().toString().padStart(2, '0')
      const month = (dateTime.getMonth() + 1).toString().padStart(2, '0')
      const year = dateTime.getFullYear()
      const hour = dateTime.getHours().toString().padStart(2, '0')
      const minute = dateTime.getMinutes().toString().padStart(2, '0')
      return `${day}/${month}/${year} ${hour}:${minute}`
    }
  },
  async mounted() {
    try {
      await store.loadHealthProfile()
      this.info = await store.storeHealthProfile
      console.log(this.info)
      this.loading = false
    } catch (error) {
      console.error('Error fetching data:', error)
      message.error('Error:' + error, 3)
    }
  }
}
</script>
<style lang=""></style>
