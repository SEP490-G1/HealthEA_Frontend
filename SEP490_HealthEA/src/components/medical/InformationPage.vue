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
              <a-select-option :value="1">Nam</a-select-option>
              <a-select-option :value="2">Nữ</a-select-option>
            </a-select>
          </a-form-item>
        </a-col> </a-row
      ><a-row>
        <a-col class="gutter-row" :span="6">
          <a-form-item label="Ngày sinh" name="dateOfBirth">
            {{ formState.dateOfBirth }}
            <!-- <a-date-picker
              :bordered="false"
              format="YYYY-MM-DD"
              v-model:value="formState.dateOfBirth"
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
            />-->
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
          <a-form-item label="Ghi chú" name="residence">
            <a-textarea :bordered="false" style="width: 100%" v-model:value="formState.note" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import { useMedicalRecordStore } from '@/stores/medicalRecord'
import { ref } from 'vue'

export default {
  data() {
    return {
      formState: ref({}),
      healthProfie: ref({}),
      idNew: this.$route.params.id
    }
  },
  async mounted() {
    const store = await useMedicalRecordStore()
    this.healthProfie = await store.getHealthProfileByID(this.idNew)
    this.formState = this.healthProfie
    console.log('sssssssssss', this.formState)
  },
  methods: {
    onFinish() {},
    onFinishFailed() {},
    buttonAS() {
      console.log(this.healthProfie)
    }
  }
}
</script>
<style lang=""></style>
