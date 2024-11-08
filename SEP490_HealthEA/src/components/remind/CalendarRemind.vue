<template lang="">
  <div>
    <a-row class="container-Calendar">
      <a-col class="gutter-box" :span="24">
        <div>
          <a-button type="primary" @click="showDrawer">
            <template #icon><PlusOutlined /></template>
            Tạo lịch mới</a-button
          >
        </div>
      </a-col>
      <a-col class="gutter-box" :span="18">
        <CalendarComponent :listEvent="listEvent" v-model:valueZ="valueDate" />
      </a-col>
      <a-col class="gutter-box" :span="6">
        <TodayPlan v-model:dateSelect="valueDate" />
      </a-col>
    </a-row>
  </div>
  <!-- ////////////////////////////////////////////////// -->
  <a-drawer
    :title="titleEvent"
    :width="720"
    :open="open"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Tiêu đề" name="Title">
            <a-input v-model:value="form.Title" placeholder="Trường tiêu đề không được để trống" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="Sự kiện diễn ra ngày" name="EventDateTime">
            <a-date-picker
              v-model:value="form.EventDateTime"
              style="width: 100%"
              :get-popup-container="(trigger) => trigger.parentElement"
            /> </a-form-item
        ></a-col>
        <a-col :span="6">
          <a-form-item name="time-start" label="Thời gian bắt đầu">
            <a-time-picker
              v-model:value="form.StartTime"
              format="HH:mm:ss"
              value-format="HH:mm:ss"
              :get-popup-container="(trigger) => trigger.parentElement"
            />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="Sự kiện kết thúc ngày" name="EventDateTime">
            <a-date-picker
              v-model:value="form.EventDateTime"
              style="width: 100%"
              :get-popup-container="(trigger) => trigger.parentElement"
            /> </a-form-item
        ></a-col>
        <a-col :span="6">
          <a-form-item name="time-end" label="Thời gian kết thúc">
            <a-time-picker
              v-model:value="form.EndTime"
              format="HH:mm:ss"
              value-format="HH:mm:ss"
              :get-popup-container="(trigger) => trigger.parentElement"
            />
          </a-form-item>
        </a-col>
        <a-col :span="20">
          <a-form-item label="Location" name="Title">
            <a-input v-model:value="form.Title" placeholder="Trường tiêu đề không được để trống" />
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item label="Kiểu lặp" name="RepeatFrequency">
            <a-select v-model:value="form.RepeatFrequency">
              <a-select-option value="1">No repeat</a-select-option>
              <a-select-option value="2">Daily</a-select-option>
              <a-select-option value="3">Weekly</a-select-option>
              <a-select-option value="4">Monthly</a-select-option>
              <a-select-option value="5">Yearly</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Description" name="description">
            <a-textarea
              v-model:value="form.description"
              :rows="4"
              placeholder="please enter url description"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #extra>
      <a-space>
        <a-button type="primary" @click="onClose">Lưu</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
<script>
import { PlusOutlined } from '@ant-design/icons-vue'
import { useRemindStore } from '@/stores/Remind'
import dayjs from 'dayjs'
import CalendarComponent from './CalendarComponent.vue'
import TodayPlan from './TodayPlan'
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
export default {
  components: {
    CalendarComponent,
    PlusOutlined,
    TodayPlan
  },
  watch: {
    valueDate(newDate, oldDate) {
      var datejsOld = (oldDate == null ? dayjs() : dayjs(oldDate)).format('YYYY-MM-DD')
      if (this.isDifferentMonth(newDate, dayjs(datejsOld))) {
        this.getRangeDate(newDate)
        this.getListEvent()
      }
    }
  },

  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: 'Please enter user name'
          }
        ],
        url: [
          {
            required: true,
            message: 'please enter url'
          }
        ],
        owner: [
          {
            required: true,
            message: 'Please select an owner'
          }
        ],
        type: [
          {
            required: true,
            message: 'Please choose the type'
          }
        ],
        approver: [
          {
            required: true,
            message: 'Please choose the approver'
          }
        ],
        dateTime: [
          {
            required: true,
            message: 'Please choose the dateTime',
            type: 'object'
          }
        ],
        description: [
          {
            required: true,
            message: 'Please enter url description'
          }
        ]
      },
      form: reactive({
        title: '',
        url: '',
        owner: '',
        type: '',
        approver: '',
        dateTime: null,
        description: ''
      }),
      titleEvent: ref('Tạo một sự kiện mới'),
      open: ref(true),
      valueDate: ref(dayjs()),
      listEvent: ref([]),
      rangeDate: ref([]),
      listToday: ref([])
    }
  },
  mounted() {
    this.getRangeDate(dayjs())
    this.getListEvent()
  },
  methods: {
    showDrawer() {
      this.titleEvent = 'Tạo một sự kiện mới'
      this.open = true
    },
    isDifferentMonth(date1, date2) {
      //dayjs

      // Lấy tháng của mỗi đối tượng
      const month1 = date1.month()
      const month2 = date2.month()
      const year2 = date1.year()
      const year1 = date2.year()
      // So sánh tháng
      return month1 !== month2 || year1 !== year2
    },
    getRangeDate(date) {
      // Tìm ngày thứ hai của tuần đầu tiên của tháng
      const firstMonday = date.startOf('month').add(1, 'day').day(0).format('YYYY-MM-DD')

      // Tìm Chủ nhật của 6 tuần sau
      const sixSundaysLater = date.add(4, 'week').day(6).format('YYYY-MM-DD')

      this.rangeDate = [firstMonday, sixSundaysLater]
    },
    convertDateStart(date) {
      return dayjs(date).format('YYYY-MM-DDT00:00:00')
    },
    onClose() {
      this.open = false
    },
    convertEndDate(date) {
      return dayjs(date).endOf('day').format('YYYY-MM-DDT23:59:59')
    },
    async getListEvent() {
      try {
        this.listEvent = []
        const store = await useRemindStore()
        const array = await store.getListEventRange(
          this.convertDateStart(this.rangeDate[0]),
          this.convertEndDate(this.rangeDate[1])
        )

        if (array == undefined) {
          return
        }
        this.listEvent = array.events
      } catch (error) {
        console.log(error)
        message.error('Không thể lấy được dữ liệu hãy gửi lại!', 3)
      }
    }
  }
}
</script>
<style scoped>
.gutter-box {
  padding: 0 10px;
}
</style>
