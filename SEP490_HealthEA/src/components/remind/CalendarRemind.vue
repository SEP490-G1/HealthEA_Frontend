<template lang="">
  <div>
    <a-row class="container-Calendar">
      <a-col class="gutter-box" :span="24">
        <div>
          <a-button type="primary">Tạo lịch mới</a-button>
        </div>
      </a-col>
      <a-col class="gutter-box" :span="18">
        <CalendarComponent v-model:valueZ="valueDate" />
      </a-col>
      <a-col class="gutter-box" :span="6">
        <TodayPlan />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import CalendarComponent from './CalendarComponent.vue'
import TodayPlan from './TodayPlan'
import { ref } from 'vue'
export default {
  components: {
    CalendarComponent,
    TodayPlan
  },
  data() {
    return {
      valueDate: ref(null)
    }
  },
  methods: {}
}
</script>
<style scoped>
.gutter-box {
  padding: 0 10px;
}
</style>
