<script setup>
import ContentFooter from '@/components/layout/ContentFooter'
</script>
<template lang="">
  <ContentFooter>
    <a-typography-title :level="2">Danh sách hồ sơ sức khỏe của bạn</a-typography-title>
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="5">
        <a-card title="Default size  1" style="width: 100%">
          <template #extra><a href="#">more</a></template>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <a-card title="Default size 2" style="width: 100%">
          <template #extra><a href="#">more</a></template>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <a-card title="Default size card 3" style="width: 100%">
          <template #extra><a href="#">more</a></template>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <a-card title="Default size card 4" style="width: 100%">
          <template #extra><a href="#">more</a></template>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </a-card>
      </a-col>
    </a-row>

    <RouterLink to="/profileHealth/medical_record">Chuyển</RouterLink>
  </ContentFooter>
</template>
<script>
export default {}
</script>
<style lang=""></style>
