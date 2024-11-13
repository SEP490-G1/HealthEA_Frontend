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
    <div style="display: flex; justify-content: center; width: 100%">
      <a-button type="link" @click="toHistory">Xem lịch sử của bạn</a-button>
    </div>
    <div v-if="listItem == []" style=""></div>
    <a-row v-if="listItem != []" :gutter="40" class="main-container">
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
      :title="updateTitle(form.titleModal)"
      :okText="form.okText"
      :cancelText="form.cancelText"
      :width="form.sizeForm"
    >
      <div v-if="form.titleModal == 'Nhiệt độ'">
        <a-form-item
          :label="form.titleModal"
          :rules="[{ required: true, message: 'Hãy nhập chỉ số này!' }]"
        >
          <a-input-number v-model:value="dailyMetric.bodyTemperature" suffix="&deg;C" />
        </a-form-item>
      </div>
      <div v-if="form.titleModal == 'Nhịp tim'">
        <a-form-item
          :label="form.titleModal"
          :rules="[{ required: true, message: 'Hãy nhập chỉ số này!' }]"
        >
          <a-input-number v-model:value="dailyMetric.heartRate" suffix="bpm" />
        </a-form-item>
      </div>
      <div v-if="form.titleModal == 'Đường huyết'">
        <a-form-item
          :label="form.titleModal"
          :rules="[{ required: true, message: 'Hãy nhập chỉ số này!' }]"
        >
          <a-input-number v-model:value="dailyMetric.bloodSugar" suffix="mg/dl" />
        </a-form-item>
      </div>
      <div v-if="form.titleModal == 'BMI'">
        <a-form-item
          label="Cân nặng"
          :rules="[{ required: true, message: 'Hãy nhập chỉ số này!' }]"
        >
          <a-input-number v-model:value="dailyMetric.weight" suffix="Kg" />
        </a-form-item>
        <a-form-item
          label="Chiều cao"
          :rules="[{ required: true, message: 'Hãy nhập chỉ số này!' }]"
        >
          <a-input-number v-model:value="dailyMetric.height" suffix="Cm" />
        </a-form-item>
      </div>
      <div v-if="form.titleModal == 'Huyết áp'">
        <a-form-item label="Tâm thu" :rules="[{ required: true, message: 'Hãy nhập chỉ số này!' }]">
          <a-input-number v-model:value="dailyMetric.systolicBloodPressure" /> mmHg
        </a-form-item>
        <a-form-item
          label="Tâm trương"
          :rules="[{ required: true, message: 'Hãy nhập chỉ số này!' }]"
        >
          <a-input-number v-model:value="dailyMetric.diastolicBloodPressure" /> mmHg
        </a-form-item>
      </div>
      <div v-if="form.titleModal == 'Độ bão hòa Oxy' || form.titleModal == 'Oxygen Saturation'">
        <a-form-item
          label="Chỉ số O2 trong máu"
          :rules="[{ required: true, message: 'Hãy nhập chỉ số này!' }]"
        >
          <a-input-number v-model:value="dailyMetric.oxygenSaturation" suffix="SPO2" />
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
        weight: null,
        height: null,
        systolicBloodPressure: null,
        diastolicBloodPressure: null,
        heartRate: null,
        bloodSugar: null,
        oxygenSaturation: null,
        bodyTemperature: null
      },
      listItem: [
        {
          Title: 'BMI',
          StokeColor: '#fcb800',
          Percent: 0,
          Value: `- -`,
          Status: 'Chưa có dữ liệu hôm nay',
          classFill: 'gray-card'
        },
        {
          Title: 'Huyết áp',
          StokeColor: '#fcb800',
          Percent: 0,
          Value: `- -`,
          Status: 'Chưa có dữ liệu hôm nay',
          classFill: 'gray-card'
        },
        {
          Title: 'Nhịp tim',
          StokeColor: '#fcb800',
          Percent: 0,
          Value: `- -`,
          Status: 'Chưa có dữ liệu hôm nay',
          classFill: 'gray-card'
        },
        {
          Title: 'Đường huyết',
          StokeColor: '#fcb800',
          Percent: 0,
          Value: `- -`,
          Status: 'Chưa có dữ liệu hôm nay',
          classFill: 'gray-card'
        },
        {
          Title: 'Nhiệt độ',
          StokeColor: '#fcb800',
          Percent: 0,
          Value: `- -`,
          Status: 'Chưa có dữ liệu hôm nay',
          classFill: 'gray-card'
        },
        {
          Title: 'Độ bão hòa Oxy',
          StokeColor: '#fcb800',
          Percent: 0,
          Value: `- -`,
          Status: 'Chưa có dữ liệu hôm nay',
          classFill: 'gray-card'
        }
      ]
    }
  },
  watch: {
    inputValue(val, preVal) {
      console.log(val, preVal)
    }
  },
  methods: {
    toHistory() {
      this.$router.push('/dailymetric/history')
    },
    updateTitle(str) {
      return `Cập nhật chỉ số ${str}`
    },
    format(newVal) {
      return !isNaN(newVal)
    },
    handleCancel() {
      this.form.open = false
    },

    onClick(item) {
      this.form.open = true
      this.form.titleModal = item.Title
    },
    async loadData() {
      try {
        const store = useDailyMetricStore()
        await store.getDailyMetricToday()
        let data = store.storeDailyMetric.data

        if (data.msg != undefined) {
          return
        }
        this.listItem = []
        ;(this.dailyMetric = {
          weight: data.dailyMetric.weight,
          height: data.dailyMetric.height,
          systolicBloodPressure: data.dailyMetric.systolicBloodPressure,
          diastolicBloodPressure: data.dailyMetric.diastolicBloodPressure,
          heartRate: data.dailyMetric.heartRate,
          bloodSugar: data.dailyMetric.bloodSugar,
          oxygenSaturation: data.dailyMetric.oxygenSaturation,
          bodyTemperature: data.dailyMetric.bodyTemperature
        }),
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
            var value = ''
            if (element.status == -1) {
              color = '#747474'
              percent = 0
              fill = 'gray-card'
              value = '--'
            }
            this.listItem.push({
              Title: element.metricName,
              Percent: percent,
              StokeColor: color,
              Value: value ? value : element.value,
              Status:
                element.description == null ? 'Trường này chưa có dữ liệu' : element.description,
              classFill: fill
            })
          })
      } catch (error) {
        console.error('Error fetching data:', error)
        message.error('Error:' + error, 3)
      }
    },
    async handleOk() {
      const store = useDailyMetricStore()
      const respon = await store.saveToday(this.dailyMetric)
      console.log(this.dailyMetric)
      if (respon.status == 204) {
        this.form.open = false
        this.loadData()
      }
    },
    formatProgress(item) {
      return `${item.Value}`
    }
  },
  async mounted() {
    this.loadData()
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
