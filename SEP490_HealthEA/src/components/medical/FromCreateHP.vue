<template>
  <a-form style="margin: 30px">
    <a-form-item label="Tên đầy đủ">
      <a-input v-model:value="userData.name" />
    </a-form-item>
    <a-form-item label="Giới tính">
      <a-radio-group v-model:value="userData.gender">
        <a-radio value="1">Nữ</a-radio>
        <a-radio value="2">Nam</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="Nơi thường trú">
      <a-textarea v-model:value="userData.address" />
    </a-form-item>
    <a-form-item label="Ghi chú">
      <a-textarea v-model:value="userData.note" />
    </a-form-item>
    <a-form-item label="Chia sẻ hồ sơ với">
      {{ userData.statusShare }}
      <a-radio-group v-model:value="userData.statusShare">
        <a-radio-button value="3">Tất cả mọi người</a-radio-button>
        <a-radio-button value="2">Tất cả người dùng khác</a-radio-button>
        <a-radio-button value="1">Chỉ bác sĩ</a-radio-button>
        <a-radio-button value="0">Chỉ mình tôi</a-radio-button>
      </a-radio-group>
    </a-form-item>
  </a-form>
</template>

<script>
import { ref } from 'vue'
export default {
  data() {
    return {
      userData: ref({
        name: 'Thụy',
        gender: '1',
        address: 'a',
        dob: '', // Assuming you want dob as a property
        note: '111',
        statusShare: ''
      })
    }
  },
  props: {
    formStage: ref({
      name: '',
      gender: '',
      address: '',
      dob: '', // Assuming you want dob as a property
      note: '',
      statusShare: ''
    })
  }
}
</script>
