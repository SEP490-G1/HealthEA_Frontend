<template>
  <a-form style="margin: 30px;" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="Tên đầy đủ">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="Resources">
      <a-radio-group v-model:value="formState.resource">
        <a-radio value="1">Nữ</a-radio>
        <a-radio value="2">Nam</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="Ngày sinh">
      <a-date-picker />
    </a-form-item>
    <a-form-item label="Nơi thường trú">
      <a-textarea v-model:value="formState.desc" />
    </a-form-item>
    <a-form-item label="Ghi chú">
      <a-textarea v-model:value="formState.desc" />
    </a-form-item>
    <a-form-item label="Chia sẻ hồ sơ với">
      <a-radio-group v-model:value="formState.layout">
        <a-radio-button value="horizontal">Tất cả mọi người</a-radio-button>
        <a-radio-button value="vertical">Vertical</a-radio-button>
        <a-radio-button value="inline">Inline</a-radio-button>
      </a-radio-group>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { toRaw } from 'vue'
import { ref } from 'vue'

const formState = ref({
  name: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})
const onSubmit = () => {
  console.log('submit!', toRaw(formState))
}
const labelCol = { style: { width: '150px' } }
const wrapperCol = { span: 14 }
</script>
