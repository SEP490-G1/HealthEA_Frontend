<script setup>
import ContentFooter from '@/components/layout/ContentFooter'
import { useDailyMetricStore } from '@/stores/DailyMetricView'
import { ref } from 'vue'
</script>
<template lang="">
  <ContentFooter>
    <a-typography-title style="display: flex; justify-content: center">
      Lịch sử nhập chỉ số sức khỏe
    </a-typography-title>
    <div style="display: flex; justify-content: center; width: 100%">
      <a-button type="link" @click="toHistory">Xem chỉ số hôm nay</a-button>
    </div>
    <div class="container-chart">
      <div class="controller-chart">
        <a-form-item name="range-picker" label="RangePicker" v-bind="rangeConfig">
          <a-range-picker v-model:value="formState.rangePicker" value-format="YYYY-MM-DD" />
        </a-form-item>
      </div>
      <div id="chart">
        <apexchart
          type="line"
          height="350"
          v-model:options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
    <div class="container-list">
      <listMetric @handleClickDelete="deleteClick" v-model:list="listValue.data" />
    </div>
  </ContentFooter>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import DailyMetricList from './DailyMetricList.vue'
export default {
  components: {
    apexchart: VueApexCharts,
    listMetric: DailyMetricList
  },
  watch: {
    'formState.rangePicker': function () {
      this.loadData()
    }
  },
  data() {
    return {
      rangeConfig: {
        rules: [
          {
            type: 'array',
            required: true,
            message: 'Please select time!'
          }
        ]
      },
      listValue: {},
      formState: {
        rangePicker: [this.subtractDay(this.getTodayInYYYYMMDD(), 7), this.getTodayInYYYYMMDD()]
      },
      series: [],
      chartOptions: ref({
        chart: {
          height: 100,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Product Trends by Month',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
        }
      })
    }
  },
  beforeMount() {
    this.loadData()
  },
  methods: {
    async deleteClick(id) {
      const store = useDailyMetricStore()
      await store.deleteDailyMetricToday(id)
      this.loadData()
      console.log('Xóa thành công')
      console.log(this.series)
    },
    subtractMonth(dateString, monthz) {
      // Chuyển đổi chuỗi ngày thành đối tượng Date
      const date = new Date(dateString)

      // Trừ đi 1 tháng (lưu ý: tháng bắt đầu từ 0)
      date.setMonth(date.getMonth() - monthz)

      // Định dạng lại ngày thành chuỗi "YYYY-MM-DD"
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')

      return `${year}-${month}-${day}`
    },
    subtractDay(dateString, dayz) {
      // Chuyển đổi chuỗi ngày thành đối tượng Date
      const date = new Date(dateString)

      // Trừ đi 1 tháng (lưu ý: tháng bắt đầu từ 0)
      date.setDate(date.getDay() - dayz)

      // Định dạng lại ngày thành chuỗi "YYYY-MM-DD"
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')

      return `${year}-${month}-${day}`
    },
    getTodayInYYYYMMDD() {
      const today = new Date()
      const year = today.getFullYear()
      const month = (today.getMonth() + 1).toString().padStart(2, '0') // Tháng bắt đầu từ 0 nên cộng thêm 1 và dùng padStart để đảm bảo có 2 chữ số
      const day = today.getDate().toString().padStart(2, '0')

      return `${year}-${month}-${day}`
    },
    setupCategory(startDateString, endDateString) {
      let list = []
      // Chuyển đổi chuỗi ngày thành đối tượng Date
      const startDate = new Date(startDateString)
      const endDate = new Date(endDateString)

      // Tính số ngày giữa hai ngày
      const oneDay = 24 * 60 * 60 * 1000 // Số mili giây trong một ngày
      const diffDays = Math.round(Math.abs((endDate - startDate) / oneDay))

      // Tạo vòng lặp for
      for (let i = 0; i <= diffDays; i++) {
        const currentDate = new Date(startDate)
        currentDate.setDate(startDate.getDate() + i)

        // Định dạng lại ngày (ví dụ: dd/mm/yyyy)
        const formattedDate = currentDate.toLocaleDateString('vi-VN') // Thay 'vi-VN' bằng locale mong muốn
        list.push(formattedDate)
      }

      this.chartOptions.xaxis.categories = list
    },
    async loadData() {
      var startDate = this.formState.rangePicker[0]
      var endDate = this.formState.rangePicker[1]
      //setup category
      this.setupCategory(startDate, endDate)

      //setup value
      const store = useDailyMetricStore()
      this.listValue = await store.getRangeDailyMetric(startDate, endDate)
      console.log(this.listValue.data)
      var n = this.chartOptions.xaxis.categories.length
      this.series = []
      var heartRate = Array.from({ length: n }, () => 0)
      var height = Array.from({ length: n }, () => 0)
      var weight = Array.from({ length: n }, () => 0)
      var bloodSugar = Array.from({ length: n }, () => 0)
      var systolicBloodPressure = Array.from({ length: n }, () => 0)
      var diastolicBloodPressure = Array.from({ length: n }, () => 0)
      var bodyTemperature = Array.from({ length: n }, () => 0)
      var oxygenSaturation = Array.from({ length: n }, () => 0)
      this.listValue.data.forEach((element) => {
        var index = this.calculateDaysBetweenDates(element.date, startDate)
        heartRate[index] = element.heartRate
        height[index] = element.height
        weight[index] = element.weight
        bloodSugar[index] = element.bloodSugar
        systolicBloodPressure[index] = element.systolicBloodPressure
        diastolicBloodPressure[index] = element.diastolicBloodPressure
        bodyTemperature[index] = element.bodyTemperature
        oxygenSaturation[index] = element.oxygenSaturation
      })
      this.series.push({
        name: 'Nhịp tim',
        data: heartRate
      })
      this.series.push({
        name: 'Chiều cao',
        data: height
      })
      this.series.push({
        name: 'Cân nặng',
        data: weight
      })
      this.series.push({
        name: 'Chỉ số đường huyết',
        data: bloodSugar
      })
      this.series.push({
        name: 'Huyết áp tâm thu',
        data: systolicBloodPressure
      })
      this.series.push({
        name: 'Huyết áp tâm thất',
        data: diastolicBloodPressure
      })
      this.series.push({
        name: 'Chỉ số oxy trong máu',
        data: oxygenSaturation
      })
    },
    calculateDaysBetweenDates(startDate, endDate) {
      // Chuyển đổi các chuỗi ngày thành đối tượng Date
      const date1 = new Date(startDate)
      const date2 = new Date(endDate)

      // Tính hiệu số mili giây giữa hai ngày
      const diffInMs = Math.abs(date2 - date1)

      // Chuyển đổi hiệu số mili giây thành số ngày
      const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))

      return diffInDays
    },
    toHistory() {
      this.$router.push('/dailymetric')
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
.gray-card {
  color: #747474;
  font-weight: bold;
}
.main-container {
  justify-content: center;
}
</style>
