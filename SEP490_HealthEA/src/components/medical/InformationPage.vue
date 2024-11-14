<template lang="">
  <div>
    <a-typography-title style="margin: 10px">Thông tin dịch tễ</a-typography-title>
  </div>
</template>
<script>
import { useMedicalRecordStore } from '@/stores/medicalRecord'
import { ref } from 'vue'

export default {
  data() {
    return {
      healthProfie: ref({}),
      idNew: this.$route.params.id
    }
  },
  async mounted() {
    const store = await useMedicalRecordStore()
    this.healthProfie = await store.getHealthProfileByID(this.idNew)
    console.log(this.healthProfie)
  },
  methods: {
    buttonAS() {
      console.log(this.healthProfie)
    }
  }
}
</script>
<style lang=""></style>
