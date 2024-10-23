<script setup>
import ContentFooter from '@/components/layout/ContentFooter'
</script>
<template lang="">
  <ContentFooter>
    <a-typography-title :level="2">Danh sách hồ sơ sức khỏe của bạn</a-typography-title>
    <a-row :gutter="[16, 16]" justify="start">
      <a-col v-for="item in info" :key="item.id" class="gutter-row" :span="6">
        <RouterLink to="/profileHealth/medical_record">
          <a-card :loading="loading" hoverable style="width: 100%; margin-bottom: 20px">
            <template #title>
              <a-skeleton-input v-if="loading" active />
              <div v-if="!loading">{{ item.title }}</div>
            </template>
            <template v-if="!loading" #extra>
              <a href="#">more</a>
            </template>
            <template v-if="!loading" #tabBarExtraContent>
              <a href="#">more</a>
            </template>
            <p>{{ item.fullName }}</p>
            <p>{{ item.lastModifyDate }}</p>
          </a-card>
        </RouterLink>
      </a-col>
    </a-row>
  </ContentFooter>
</template>
<script>
import { useMedicalRecordStore } from '@/stores/medicalRecord'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
const store = useMedicalRecordStore()
export default {
  data() {
    return {
      info: ref[({}, {}, {}, {}, {}, {}, {}, {})],
      loading: true,
      errored: false
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
