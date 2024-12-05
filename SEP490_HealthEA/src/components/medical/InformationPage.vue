<template lang="">
  <div>
    <a-typography-title style="margin: 10px">Thông tin dịch tễ</a-typography-title>
    <a-form
      style="margin: 20px"
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-row>
        <a-col class="gutter-row" :span="6">
          <a-form-item label="Họ và tên" name="fullName">
            <a-input :bordered="false" style="width: 100%" v-model:value="formState.fullName" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="6">
          <a-form-item label="Giới tính" name="gender">
            <a-select :bordered="false" v-model:value="formState.gender">
              <a-select-option :value="0">---</a-select-option>
              <a-select-option :value="2">Nam</a-select-option>
              <a-select-option :value="1">Nữ</a-select-option>
            </a-select>
          </a-form-item>
        </a-col> </a-row
      ><a-row>
        <a-col class="gutter-row" :span="6">
          <a-form-item label="Ngày sinh" name="dateOfBirth">
            <!-- {{ formState.dateOfBirth }} -->
            <a-date-picker
              v-model:value="formState.dateOfBirth"
              valueFormat="YYYY-MM-DD"
              format="YYYY-MM-DD"
              :bordered="false"
            />
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="6">
          <a-form-item label="Nơi sống" name="residence">
            <a-input :bordered="false" style="width: 100%" v-model:value="formState.residence" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item label="Ghi chú" name="note">
            <a-textarea :bordered="false" style="width: 100%" v-model:value="formState.note" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-button :disabled="!status" type="primary" html-type="submit">Lưu thay đổi</a-button>
    </a-form>
  </div>
</template>
<script>
import { useMedicalRecordStore } from '@/stores/medicalRecord'
import { message } from 'ant-design-vue'
import { ref } from 'vue'

export default {
  watch: {
    formState: {
      handler() {
        this.status = true
      },
      deep: true // This is crucial for watching nested changes
    }
  },
  data() {
    return {
      status: ref(false),
      formState: ref({}),
      healthProfie: ref({}),
      idNew: this.$route.params.id
    }
  },
  async mounted() {
    const store = await useMedicalRecordStore()
    let response = await store.getHealthProfileByID(this.idNew)
    if (response.data.statusCode == 401) {
      return
    }

    this.healthProfie = response.data.data
    this.formState = await this.healthProfie
    this.status = await false
  },
  methods: {
    async onFinish() {
      const store = await useMedicalRecordStore()
      let log = await store.updateHealthProfile(this.formState.id, this.formState)
      this.status = await false
      message.success('Cập nhật thành công')
      console.log(log)
    },
    onFinishFailed() {
      message.error('Kiểm tra lại các trường')
    },
    buttonAS() {
      console.log(this.healthProfie)
    }
  }
}
</script>
<style lang=""></style>
