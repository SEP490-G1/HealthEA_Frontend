<script setup>
import ContentFooter from '@/components/layout/ContentFooter'
import { useDailyMetricStore } from '@/stores/DailyMetricView'
import { message } from 'ant-design-vue'
</script>
<template lang="">
  <ContentFooter>
    <a-typography-title style="display: flex; justify-content: center">
      Chỉ số sức khỏe của bạn
    </a-typography-title>
    <a-row :gutter="40" class="main-container">
      <a-col v-for="(item, key) in listItem" :key="key" class="gutter-row" :span="5">
        <div @click="onClick(item)" class="card">
          <a-typography-title style="margin-top: 15px" :level="4">{{
            item.Title
          }}</a-typography-title>
          <a-progress
            class=""
            status="active"
            type="dashboard"
            :stroke-color="item.StokeColor"
            :percent="item.Percent"
            :format="() => formatProgress(item)"
            :size="150"
          />
          <a-typography-title :class="item.classFill" style="font-weight: bold" :level="5">{{
            item.Status
          }}</a-typography-title>
        </div>
      </a-col>
    </a-row>
    <CommonLayout
      :handleCancel="handleCancel"
      :handleOk="handleOk"
      :open="form.open"
      :title="form.titleModal"
      :okText="form.okText"
      :cancelText="form.cancelText"
      :width="form.sizeForm"
    >
      <div v-if="form.titleModal == 'bodyTemperature'">
        <a-form-item
          :label="form.titleModal"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="dailyMetric.bodyTemperature" suffix="&deg;C" />
        </a-form-item>
      </div>
      <div v-if="form.titleModal == 'heartRate'">
        <a-form-item
          :label="form.titleModal"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="dailyMetric.heartRate" suffix="bpm" />
        </a-form-item>
      </div>
      <div v-if="form.titleModal == 'bloodSugar'">
        <a-form-item
          :label="form.titleModal"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="dailyMetric.bloodSugar" suffix="mg/dl" />
        </a-form-item>
      </div>
      <div v-if="form.titleModal == 'bmi'">
        <a-form-item
          label="Cân nặng"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="dailyMetric.weight" suffix="Kg" />
        </a-form-item>
        <a-form-item
          label="Chiều cao"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="dailyMetric.height" suffix="Cm" />
        </a-form-item>
      </div>
      <div v-if="form.titleModal == 'bloodPressure'">
        <a-form-item
          label="Tâm Thu"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="dailyMetric.systolicBloodPressure" suffix="mmHg" />
        </a-form-item>
        <a-form-item
          label="Tâm trương"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="dailyMetric.diastolicBloodPressure" suffix="mmHg" />
        </a-form-item>
      </div>
    </CommonLayout>
  </ContentFooter>
</template>

<script>
import CommonLayout from '@/components/common/TheModal'
export default {
  data() {
    return {
      form: {
        titleModal: 'Đường huyết',
        open: false,
        sizeForm: '1000px',
        okText: 'Lưu',
        cancelText: 'Hủy'
      },
      dailyMetric: {
        id: 'cf798a7f-1ce9-4007-bebc-25d4505e8422',
        userId: 'acd5ce39-cb1f-46a5-beca-6b0686b8b360',
        weight: 180,
        height: 85,
        systolicBloodPressure: 90,
        diastolicBloodPressure: 120,
        heartRate: 60,
        bloodSugar: 98,
        bodyTemperature: 37,
        date: '2024-11-04'
      },
      listItem: []
    }
  },
  methods: {
    handleCancel() {
      this.form.open = false
    },
    onClick(item) {
      this.form.open = true
      console.log(item)
      this.form.titleModal = item.Title
    },
    handleOk() {
      this.form.open = true
    },
    formatProgress(item) {
      return `${item.Value}`
    }
  },
  async mounted() {
    try {
      const store = useDailyMetricStore()
      await store.getDailyMetricToday()
      let data = store.storeDailyMetric.data
      data.values.forEach((element) => {
        let color, percent, fill
        if (element.status == 2) {
          color = '#48cd93'
          percent = 58
          fill = 'normal-card'
        }
        if (element.status == 3) {
          color = '#fcb800'
          percent = 88
          fill = 'warning-card'
        }
        if (element.status == 1) {
          color = '#fcb800'
          percent = 28
          fill = 'warning-card'
        }
        this.listItem.push({
          Title: element.metricName,
          Percent: percent,
          StokeColor: color,
          Value: element.value,
          Status: element.description,
          classFill: fill
        })
      })
    } catch (error) {
      console.error('Error fetching data:', error)
      message.error('Error:' + error, 3)
    }
  }
}
</script>
<style scoped>
.card {
  cursor: pointer;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 30px 0;
  justify-content: space-between;
  border: 1px solid #ccc;
  transition: box-shadow 0.3s;
}
.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.normal-card {
  color: #48cd93;
  font-weight: bold;
}
.warning-card {
  color: rgb(252, 184, 0);
  font-weight: bold;
}
.danger-card {
  color: #e50031;
  font-weight: bold;
}
.main-container {
  justify-content: center;
}
</style>
