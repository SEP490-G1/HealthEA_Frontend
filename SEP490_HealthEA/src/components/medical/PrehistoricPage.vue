<script setup></script>
<template lang="">
  <div>
    <a-button type="primary" @click="changeView">Change View</a-button>
    <div style="padding-left: 100px">
      <a-typography-title :level="2" align="left">Tiền sử bệnh</a-typography-title>
      <a-typography style='color: gray; font-size: 18px' align="left">Lần cuối thay đổi</a-typography>
      
      <a-typography-title class="Title" :level="3">I. Thông tin hành chính</a-typography-title>
      <a-typography-title :level="4">1. Thông tin chung</a-typography-title>
      <a-row>
        <a-col class="Truong" :span="12">
          <div>
            <div>Họ và tên:</div>
            <a-typography-paragraph
              v-model:content="formState.fullName"
              :editable="viewMode == '1'"
            />
          </div>
        </a-col>
        <a-col class="Truong" :span="12">Giới tính: </a-col>
        <a-col class="Truong" :span="12">Nhóm máu: </a-col
        ><a-col class="Truong" :span="12">Hệ Rh: </a-col>
        <a-col class="Truong" :span="12">Ngày sinh: </a-col
        ><a-col class="Truong" :span="12">Nơi đăng ký khai sinh: </a-col>
        <a-col class="Truong" :span="6">Nghề nghiệp </a-col>
        <a-col class="Truong" :span="6">Dân tộc: </a-col>
        <a-col class="Truong" :span="6">Quốc tịch: </a-col>
        <a-col class="Truong" :span="6">Tôn giáo: </a-col>
      </a-row>
      <a-typography-title :level="4">2.Thông tin riêng tư</a-typography-title>
      <a-row>
        <a-col class="Truong" :span="6">Họ và tên: </a-col>
        <a-col class="Truong" :span="6">Quan hệ với hồ sơ: </a-col>
        <a-col class="Truong" :span="6">Email: </a-col>
        <a-col class="Truong" :span="6">Điện thoại: </a-col>
      </a-row>
      <a-typography-title :level="4">3.Thông tin liên hệ</a-typography-title>
      <a-typography-title :level="5">Liên hệ 1:</a-typography-title>
      <a-row>
        <a-col class="Truong" :span="6">Họ và tên: </a-col>
        <a-col class="Truong" :span="6">Quan hệ với hồ sơ: </a-col>
        <a-col class="Truong" :span="6">Email: </a-col>
        <a-col class="Truong" :span="6">Điện thoại: </a-col>
      </a-row>
      <a-typography-title class="Title" :level="3">
        II. Thông tin tiền sử và các yếu tố liên quan đến sức khỏe
      </a-typography-title>
      <a-typography-title :level="4">1.Tình trạng lúc mới sinh</a-typography-title>
      <a-row>
        <a-col class="Truong" :span="6">Đẻ thường: </a-col>
        <a-col class="Truong" :span="6">Đẻ mỏ: </a-col>
        <a-col class="Truong" :span="6">Đẻ thiếu tháng: </a-col>
        <a-col class="Truong" :span="6">Bị ngạt lúc đẻ: </a-col>
      </a-row>
      <a-row>
        <a-col class="Truong" :span="6">Cân nặng lúc đẻ: </a-col>
        <a-col class="Truong" :span="6">Chiều dài lúc đẻ: </a-col>
        <a-col class="Truong" :span="6">Dị tật bẩm sinh: </a-col>
        <a-col class="Truong" :span="6">Vấn đề khác: </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import { useMedicalRecordStore } from '@/stores/medicalRecord'
import { ref } from 'vue'
export default {
  data() {
    return {
      idHP: this.$route.params.id,
      formState: ref({ fullName: '' }),
      customStyle: 'background: #f7f7f7;border-radius: 4px;border: 0;overflow: hidden',
      viewMode: ref('1'),
      medicalDocument: ref({})
      //1 edit, 0 view
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const store = useMedicalRecordStore()
      var response = await store.getListAType(this.idHP, 4)
      var list = response.data.data
      if (list.length <= 0) {
        var obj = {
          image: [],
          type: 4,
          healthProfileId: this.idHP,
          contentMedical: '{}'
        }
        store.addNewDP(obj)
        response = await store.getListAType(this.idHP, 4)
        list = response.data.data
      }
      console.log(list[0])
      this.medicalDocument = list[0]
    },
    changeView() {
      this.viewMode = !this.viewMode
    }
  }
}
</script>
<style scoped>
.output-group {
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 20px;
  padding: 20px;
  margin: 200px;
  margin-top: 30px;
}
.Title {
  padding-top: 30px;
}
.Truong {
  padding: 10px;
}
.Truong > div {
  display: flex;
}
.Truong > div > div {
  margin-right: 10px;
}
.colap .ant-collapse-header-text {
  background-color: aquamarine;
}
</style>
