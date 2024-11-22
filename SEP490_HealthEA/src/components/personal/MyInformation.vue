<template>
  <div>
    <a-typography-title :level="2">Thông tin của tài khoản</a-typography-title>
    <div>
      <div>
        <a-form ref="formRef" :model="formState" :rules="rules">
          <a-row>
            <a-col :span="12" style="display: flex">
              <a-form-item label="Họ và tên" name="userFirstName" style="width: 200px">
                <a-input
                  :bordered="false"
                  v-model:value="formState.userFirstName"
                  placeholder="Trống"
                />
              </a-form-item>
              <a-form-item label="" name="userLastName">
                <a-input
                  :bordered="false"
                  v-model:value="formState.userLastName"
                  placeholder="Trống"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="3">
              <a-form-item label="Giới tính" name="gender">
                <a-select :bordered="false" v-model:value="formState.gender" placeholder="Trống">
                  <a-select-option value="1">Nam</a-select-option>
                  <a-select-option value="2">Nữ</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="Ngày sinh" name="dob">
                <a-date-picker
                  :bordered="false"
                  v-model:value="formState.dob"
                  placeholder="Trống"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="Email" name="email">
                <a-input :bordered="false" v-model:value="formState.email" placeholder="Trống" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      {{ formState }}
    </div>
  </div>
</template>
<script>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
export default {
  setup() {
    const userStore = useUserStore()
    const myInfo = userStore.user
    return { myInfo }
  },
  mounted() {},
  data() {
    return {
      labelCol: { span: 12 },
      wrapperCol: { span: 200 },
      formState: ref(this.myInfo)
    }
  }
}
</script>
<style lang=""></style>
