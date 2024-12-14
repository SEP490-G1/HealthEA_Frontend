<script setup>
import ContentFooter from '@/components/layout/ContentFooter'
import CommonLayout from '@/components/common/TheModal'
import { EllipsisOutlined } from '@ant-design/icons-vue'
</script>
<template lang="">
  <ContentFooter>
    <a-typography-title :level="2">Danh sách hồ sơ sức khỏe của bạn</a-typography-title>
    <div style="margin-bottom: 50px">
      <a-button size="large" type="primary" @click="showModal"><PlusOutlined />Thêm hồ sơ</a-button>
    </div>
    <a-row :gutter="[16, 16]" justify="start">
      <a-col v-for="item in info" :key="item.id" class="gutter-row" :span="6">
        <RouterLink :to="`/profileHealth/medical_record/information/${item.id}`">
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
                  <a-typography-title style="margin-bottom: 0px" :level="4">{{
                    item.fullName
                  }}</a-typography-title>
                </div>
              </template>
              <template v-if="!loading" #extra>
                <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link" @click.prevent> <EllipsisOutlined style="font-size: 20px"/> </a>
                  <template #overlay v-if="!loading">
                    <a-menu>
                      <a-menu-item @click="Delete(item.id)" key="1">Xóa</a-menu-item>
                      <a-menu-item @click="Modified(item.id)" key="2">Chỉnh sửa</a-menu-item>
                      <a-menu-item @click="Share(item)" key="3"
                        >Thay đổi quyền truy cập</a-menu-item
                      >
                    </a-menu>
                  </template>
                </a-dropdown>
              </template>
              <template v-if="!loading" #tabBarExtraContent>
                <a href="#"><EllipsisOutlined /></a>
              </template>
              <div style="backgroundcolor: blue">
                <a-typography-text type="secondary" style="display: flex"
                  ><p>Thay đổi lần cuối:&nbsp;</p>
                  {{ formatDate(item.lastModifyDate) }}</a-typography-text
                >
              </div>
            </a-card>
            <template #overlay v-if="!loading">
              <a-menu>
                <a-menu-item @click="Delete(item.id)" key="1">Xóa</a-menu-item>
                <a-menu-item @click="Modified(item.id)" key="2">Chỉnh sửa</a-menu-item>
                <a-menu-item @click="Share(item)" key="3">Thay đổi quyền truy cập</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </RouterLink>
      </a-col>
    </a-row>
    <CommonLayout
      :handleCancel="() => (openShare = !openShare)"
      :handleOk="() => (openShare = !openShare)"
      :open="openShare"
      title="Quản lý chia sẻ hồ sơ"
      okText="Đồng ý"
      cancelText="Hủy"
      :width="sizeForm"
      height="500px"
    >
      <a-typography-title :level="3">{{ userData.fullName }}</a-typography-title>
      <a-form-item
        label="Chia sẻ hồ sơ với"
        :rules="[{ required: true, message: 'Please chosse a value' }]"
      >
        <a-radio-group v-model:value="userData.sharedStatus">
          <a-radio-button :value="3">Tất cả mọi người</a-radio-button>
          <a-radio-button :value="2">Tất cả người dùng khác</a-radio-button>
          <a-radio-button :value="1">Chỉ bác sĩ</a-radio-button>
          <a-radio-button :value="0">Chỉ mình tôi</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="Chia sẻ bằng"
            :rules="[{ required: true, message: 'Please chosse a value' }]"
          >
            <a-button
              style="{margin: 10px}"
              type="primary"
              @click="
                () => {
                  qr.Status = !qr.Status
                  qr.Name = qr.Status == true ? 'Ẩn' : 'Lấy'
                }
              "
              >{{ qr.Name }} QRCode</a-button
            >
            <TheQRCode
              v-if="qr.Status"
              :LINK="`/profileHealth/medical_record/information/${userData.id}`"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-input-group compact style="display: flex">
            <a-input :value="`/profileHealth/medical_record/information/${userData.id}`" />
            <a-tooltip title="copy url">
              <a-button> </a-button>
            </a-tooltip>
          </a-input-group>
        </a-col>
      </a-row>
    </CommonLayout>
    <CommonLayout
      :handleCancel="handleCancel"
      :handleOk="handleOk"
      :open="open"
      title="Tạo mới hồ sơ sức khỏe"
      :okText="stageForm == '0' ? 'Tạo mới' : 'Lưu thay đổi'"
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
import TheQRCode from '../common/TheQRCode.vue'
import { FolderFilled, FolderOpenFilled, PlusOutlined } from '@ant-design/icons-vue'
import { useMedicalRecordStore } from '@/stores/medicalRecord'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
const store = useMedicalRecordStore()
export default {
  data() {
    return {
      userData: {
        //0 add , 1 edit
        stageForm: '0',
        fullName: '',
        gender: '1',
        residence: '',
        dateOfBirth: '', // Assuming you want dob as a property
        note: '',
        sharedStatus: '0'
      },
      idModi: '',
      qr: ref({ Status: false, Name: 'Lấy' }),
      msgName: '',
      msgdt: '',
      info: ref[({}, {}, {}, {}, {}, {}, {}, {})],
      loading: true,
      errored: false,
      open: false,
      openShare: false,
      sizeForm: '1000px'
    }
  },
  watch: {
    'userData.sharedStatus'(newValue) {
      if (this.openShare == true) {
        this.changeShare(this.userData.id, newValue)
      }
    }
  },
  methods: {
    async Share(item) {
      this.openShare = !this.openShare

      this.userData = item
    },
    async changeShare(id, number) {
      const store = useMedicalRecordStore()
      var st = await store.changeShare(id, number)
      console.log(st)
    },
    async Modified(id) {
      const store = useMedicalRecordStore()
      this.userData.stageForm = 1
      this.idModi = id
      var ss = await store.getHealthProfileByID(id)
      var st = ss.data.data
      
      this.userData.fullName = st.fullName
      this.userData.gender = `${st.gender}`
      this.userData.residence = st.residence
      this.userData.dateOfBirth = st.dateOfBirth
      this.userData.note = st.note
      this.userData.sharedStatus = `${st.sharedStatus}`
      console.log(this.userData);
      
      this.open = true
      
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
      await store.deleteHealthProfile(i)
      await store.loadHealthProfile()
      this.info = await store.storeHealthProfile
    },
    async handleOk() {
      if (!this.validateName(this.userData.fullName)) {
        message.error('Bạn phải nhập Họ và tên của hồ sơ')
        return
      }
      if (!this.validateDateTime(this.userData.dateOfBirth)) {
        message.error('Bạn phải nhập ngày tháng năm sinh của hồ sơ')
        return
      }
      if (this.stageForm == 0) {
        await store.addNewHealthProfile(this.userData)
      }

      if (this.stageForm == 1) {
        console.log(this.userData)
        console.log(this.idModi)

        let res = await store.updateHealthProfile(this.idModi, this.userData)
        console.log(res)
      }
      this.open = false
      await store.loadHealthProfile()
      this.info = await store.storeHealthProfile
    },
    showModal() {
      this.stageForm = 0
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
      this.loading = false
    } catch (error) {
      console.error('Error fetching data:', error)
      message.error('Error:' + error, 3)
    }
  }
}
</script>

<style scoped>
.site-input-group-wrapper .site-input-split {
  background-color: #fff;
}

.site-input-group-wrapper .site-input-right {
  border-left-width: 0;
}

.site-input-group-wrapper .site-input-right:hover,
.site-input-group-wrapper .site-input-right:focus {
  border-left-width: 1px;
}

.site-input-group-wrapper .ant-input-rtl.site-input-right {
  border-right-width: 0;
}

.site-input-group-wrapper .ant-input-rtl.site-input-right:hover,
.site-input-group-wrapper .ant-input-rtl.site-input-right:focus {
  border-right-width: 1px;
}
[data-theme='dark'] .site-input-group-wrapper .site-input-split {
  background-color: transparent;
}
</style>
