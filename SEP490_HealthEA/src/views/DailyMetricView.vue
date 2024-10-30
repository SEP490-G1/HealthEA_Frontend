<script setup>
import ContentFooter from '@/components/layout/ContentFooter'
import { useDailyMetricStore } from '@/stores/DailyMetricView'
import { message } from 'ant-design-vue'
</script>
<template lang="">
  <ContentFooter>
    <a-typography-title>Chỉ số sức khỏe của bạn</a-typography-title>
    <a-row :gutter="40">
      <a-col v-for="(item, key) in listItem" :key="key" class="gutter-row" :span="5">
        <div class="card">
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
  </ContentFooter>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      listItem: [
        {
          Title: 'Đường Huyết',
          Percent: 28,
          StokeColor: '#fcb800',
          Value: '133.0 mg/dl',
          Status: 'Nguy hiểm',
          classFill: 'warning-card'
        }
      ]
    }
  },
  async mounted() {
    try {
      const store = useDailyMetricStore()
      this.info = await store.getDailyMetricToday()
      console.log(this.info)
      this.listItem.push(this.convertTemp(this.info.bodyTemperature))
      this.listItem.push(this.convertHeartRate(this.info.heartRate))
      this.listItem.push(
        this.convertBloodPressure(this.info.diastolicBloodPressure, this.info.systolicBloodPressure)
      )
      this.listItem.push(this.convertBMI(this.info.height, this.info.weight))
      this.listItem.push(this.convertSPO2(this.info.steps))
    } catch (error) {
      console.error('Error fetching data:', error)
      message.error('Error:' + error, 3)
    }
  },
  methods: {
    convertSPO2(value) {
      var element = {
        Title: 'Nồng độ oxy trong máu',
        StokeColor: '#fcb800',
        Percent: value,
        Value: `${value}%`,
        Status: 'Thiếu oxy trong máu',
        classFill: 'warning-card'
      }
      if (value >= 93 && value <= 95) {
        element.Status = 'mức Oxy trung bình'
      }
      if (value >= 95) {
        element.Status = 'Mức oxy bình thường'
        element.classFill = 'normal-card'
        element.StokeColor = '#48cd93'
      }
      return element
    },
    convertBMI(h, k) {
      var BMI = (h / (k * k)).toFixed(2)
      var element = {
        Title: 'BMI',
        StokeColor: '#fcb800',
        Percent: 100,
        Value: `${BMI} kg/m2`,
        Status: 'Béo phì',
        classFill: 'warning-card'
      }
      if (BMI >= 18.5 && BMI <= 23) {
        element.StokeColor = '#48cd93'
        element.Percent = 58
        element.Status = 'Bình thường'
        element.classFill = 'normal-card'
      } else if (BMI < 18) {
        element.Percent = 38
        element.Status = 'Nhẹ cân'
      }
      if ((BMI < 24, 9 && BMI >= 23)) {
        element.Percent = 58
        element.Status = 'Thừa cân'
      }
      return element
    },
    convertBloodPressure(value, value2) {
      var element = {
        Title: 'Huyết áp',
        StokeColor: '#fcb800',
        Percent: 100,
        Value: `${value}/${value2} mmHg`,
        Status: 'Cao',
        classFill: 'warning-card'
      }
      if (value <= 80 && value2 <= 120 && value2 >= 90) {
        element.StokeColor = '#48cd93'
        element.Percent = 58
        element.Status = 'Bình thường'
        element.classFill = 'normal-card'
      } else if (value < 55 || value2 <= 80) {
        element.Percent = 38
        element.Status = 'Thấp'
      }
      return element
    },
    convertHeartRate(value) {
      var element = {
        Title: 'Nhịp tim',
        StokeColor: '#fcb800',
        Percent: 100,
        Value: `${value} Nhịp/Phút`,
        Status: 'Cao',
        classFill: 'warning-card'
      }
      if (value <= 100 && value >= 60) {
        element.StokeColor = '#48cd93'
        element.Percent = 58
        element.Status = 'Bình thường'
        element.classFill = 'normal-card'
      }
      if (value < 60) {
        element.Percent = 38
        element.Status = 'Thấp'
      }
      return element
    },
    convertTemp(value) {
      var element = {
        Title: 'Nhiệt độ',
        StokeColor: '#fcb800',
        Percent: 100,
        Value: `${value} Độ C`,
        Status: 'Nguy hiểm',
        classFill: 'warning-card'
      }
      if (value <= 37.1 && value >= 36.3) {
        element.StokeColor = '#48cd93'
        element.Percent = 58
        element.Status = 'Bình thường'
        element.classFill = 'normal-card'
      }
      if (value < 36.3) {
        element.Percent = 38
        element.Status = 'Thấp'
      }
      return element
    },
    formatProgress(item) {
      return `${item.Value}`
    }
  }
}
</script>
<style scoped>
.card {
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
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
</style>
