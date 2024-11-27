<template lang="">
  <div>
    <a-flex horizontal>
      <div style="width: 50%">
        <a-image-preview-group>
          <a-image
            style="border-radius: 100%"
            :width="400"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJgCpoJWxPrW-qqRTgNA_mwv3DrikuJ4e3cA&s"
          />
        </a-image-preview-group>
        <a-descriptions title="Thông tin bác sĩ" bordered>
          <a-descriptions-item label="Họ và tên">{{ doctorObj.displayName }}</a-descriptions-item>
          <a-descriptions-item label="Billing Mode">Prepaid</a-descriptions-item>
          <a-descriptions-item label="Automatic Renewal">YES</a-descriptions-item>
          <a-descriptions-item label="Order time">2018-04-24 18:00:00</a-descriptions-item>
          <a-descriptions-item label="Usage Time" :span="2"
            >2019-04-24 18:00:00</a-descriptions-item
          >
          <a-descriptions-item label="Status" :span="3">
            <a-badge status="processing" text="Running" />
          </a-descriptions-item>
          <a-descriptions-item label="Negotiated Amount">$80.00</a-descriptions-item>
          <a-descriptions-item label="Discount">$20.00</a-descriptions-item>
          <a-descriptions-item label="Official Receipts">$60.00</a-descriptions-item>
          <a-descriptions-item label="Hành động">
            <a-button danger>Báo cáo bác sĩ</a-button>
            <a-button type="primary" style="margin-left: 30px">Đề xuất chỉnh sửa</a-button>
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <div style="width: 50%">{{ doctorObj }}</div>
    </a-flex>
  </div>
</template>
<script>
import { doctorManagementStore } from '@/stores/doctorManagement'
import { ref } from 'vue'

export default {
  mounted() {
    this.loadData()
  },
  data() {
    return {
      idDoctor: this.$route.params.id,
      doctorObj: ref({})
    }
  },
  methods: {
    async loadData() {
      const store = doctorManagementStore()
      var response = await store.getId(this.idDoctor)
      this.doctorObj = response.data
    }
  }
}
</script>
<style lang=""></style>
