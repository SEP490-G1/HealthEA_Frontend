<script setup>
import ContentFooter from '@/components/layout/ContentFooter'
import modalCommon from './modalCommon.vue'
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
                      <a-menu-item key="1">1st menu item</a-menu-item>
                      <a-menu-item key="2">2nd menu item</a-menu-item>
                      <a-menu-item key="3">3rd menu item</a-menu-item>
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
                <a-menu-item key="1">1st menu item</a-menu-item>
                <a-menu-item key="2">2nd menu item</a-menu-item>
                <a-menu-item key="3">3rd menu item</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </RouterLink>
      </a-col>
    </a-row>
    <modalCommon
      :handleCancel="handleCancel"
      :handleOk="handleOk"
      :open="open"
      title="Tạo mới hồ sơ sức khỏe"
      okText="Tạo mới"
      cancelText="Hủy"
      :width="sizeForm"
      ><FromCreateHP />
    </modalCommon>
  </ContentFooter>
</template>
<script>
import { FolderFilled, FolderOpenFilled, PlusOutlined } from '@ant-design/icons-vue'
import { useMedicalRecordStore } from '@/stores/medicalRecord'
import { ref } from 'vue'
import FromCreateHP from './FromCreateHP.vue'
import { message } from 'ant-design-vue'
const store = useMedicalRecordStore()
export default {
  data() {
    return {
      info: ref[({}, {}, {}, {}, {}, {}, {}, {})],
      loading: true,
      errored: false,
      open: false,
      sizeForm: '1000px'
    }
  },
  methods: {
    handleCancel() {
      this.open = false
    },
    handleOk() {
      console.log('ok button click')
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
