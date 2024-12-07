<template lang="">
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="Quay lại"
      @back="back"
    />
    <slot></slot>
  </div>
</template>
<script>
import { useMedicalRecordStore } from '@/stores/medicalRecord'
import { ref } from 'vue'
export default {
  async mounted() {
    const store = await useMedicalRecordStore()
    this.healthProfie = await store.getHealthProfileByID(this.newId)
  },
  data() {
    return {
      newId: this.$route.params.id,
      healthProfie: ref({}),
      subtitle: ref('Đây là tiêu đề của từng tag'),
      title: ref('Tiêu đề')
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>
<style lang=""></style>
