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
        <TodayPlan
          @handleDeleteBtn="deleteRemind"
          @handleDeleteAllBtn="deleteAllRemind"
          @handleEditBtn="editRemind"
          v-model:dateSelect="valueDate"
        />
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
    <a-form
      :model="formState"
      autocomplete="off"
      :rules="rules"
      layout="vertical"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Tiêu đề" name="Title">
            <a-input v-model:value="formState.Title" placeholder="Nhập tiêu đề của bạn tại đây" />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="Sự kiện diễn ra ngày" name="EventDateTime">
            <a-date-picker
              v-model:value="formState.EventDateTime"
              placeholder="Chọn ngày bắt đầu"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%"
              :get-popup-container="(trigger) => trigger.parentElement"
            /> </a-form-item
        ></a-col>
        <a-col :span="6">
          <a-form-item name="StartTime" label="Thời gian bắt đầu">
            <a-time-picker
              v-model:value="formState.StartTime"
              placeholder="Giờ bắt đầu"
              format="HH:mm:ss"
              value-format="HH:mm:ss"
              :get-popup-container="(trigger) => trigger.parentElement"
            />
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item label="Sự kiện kết thúc ngày" name="RepeatEndDate">
            <a-date-picker
              v-model:value="formState.RepeatEndDate"
              placeholder="Chọn ngày kết thúc"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%"
              :get-popup-container="(trigger) => trigger.parentElement"
            /> </a-form-item
        ></a-col>
        <a-col :span="6">
          <a-form-item name="EndTime" label="Thời gian kết thúc">
            <a-time-picker
              v-model:value="formState.EndTime"
              placeholder="Giờ kết thúc"
              format="HH:mm:ss"
              value-format="HH:mm:ss"
              :get-popup-container="(trigger) => trigger.parentElement"
            />
          </a-form-item>
        </a-col>
        <a-col :span="18">
          <a-form-item label="Vị trí" name="Location">
            <a-input v-model:value="formState.Location" placeholder="Vị trí" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="Kiểu lặp" name="RepeatFrequency">
            <a-select v-model:value="formState.RepeatFrequency">
              <a-select-option :value="1">No repeat</a-select-option>
              <a-select-option :value="2">Daily</a-select-option>
              <a-select-option :value="3">Weekly</a-select-option>
              <a-select-option :value="4">Monthly</a-select-option>
              <a-select-option :value="5">Yearly</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="Tạo thông báo">
        <a-row :gutter="16">
          <a-col v-for="(item, index) in formState.ReminderOffsets" :key="index" :span="24">
            <a-form-item style="width: 100%" :name="['ReminderOffsets']">
              <a-row>
                <a-col :span="4">
                  <a-form-item :name="offsetUnit">
                    <a-input-number v-model:value="item.offsetUnit" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item :name="offsetValue">
                    <a-select v-model:value="item.offsetValue">
                      <a-select-option :value="1">phút</a-select-option>
                      <a-select-option :value="2">giờ</a-select-option>
                      <a-select-option :value="3">ngày</a-select-option>
                      <a-select-option :value="4">tuần</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>

                <a-button style="margin-left: 3px" type="link" @click="remove(item)">
                  Xóa
                </a-button>
              </a-row>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item>
              <a-button type="dashed" block @click="addItem">
                <PlusOutlined />
                Thêm kiểu thông báo
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-item>

      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Mô tả" name="Description">
            <a-textarea
              v-model:value="formState.Description"
              :rows="4"
              placeholder="Hãy nhập mô tả của bạn"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-button type="primary" html-type="submit">Lưu</a-button>
    </a-form>
  </a-drawer>
</template>
<script>
import { PlusOutlined } from '@ant-design/icons-vue'
import { useRemindStore } from '@/stores/Remind'
import dayjs from 'dayjs'
import CalendarComponent from './CalendarComponent.vue'
import TodayPlan from './TodayPlan.vue'
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
        Title: [
          {
            required: true,
            message: 'Hãy nhập tiêu đề sự kiện'
          }
        ],
        EventDateTime: [
          {
            required: true,
            message: 'Bắt buộc phải nhập thời gian '
          }
        ],
        StartTime: [
          {
            required: true,
            message: 'Trường này bắt buộc'
          }
        ],
        RepeatEndDate: [
          {
            required: true,
            message: 'Trường này bắt buộc nhập'
          }
        ],
        EndTime: [
          {
            required: true,
            message: 'Trường này bắt buộc nhập'
          }
        ],
        offsetUnit: [
          {
            required: true,
            message: 'Trường này bắt buộc nhập'
          }
        ]
      },
      mayForm: ref(0),
      formState: reactive({
        Title: 'Thụy',
        EventDateTime: '2024-11-06',
        StartTime: '04:04:26',
        EndTime: '04:04:26',
        Location: '',
        RepeatFrequency: 1,
        RepeatEndDate: '2024-11-08',
        Description: '',
        ReminderOffsets: [
          {
            offsetUnit: 1,
            offsetValue: 1
          }
        ]
      }),
      titleEvent: ref('Tạo một sự kiện mới'),
      open: ref(false),
      valueDate: ref(dayjs()),
      listEvent: ref([]),
      rangeDate: ref([]),
      listToday: ref([]),
      updateObj: ref()
    }
  },
  mounted() {
    this.getRangeDate(dayjs())
    this.getListEvent()
  },
  methods: {
    async deleteAllRemind(id) {
      const store = useRemindStore()
      const response = await store.deleteRemind(id)
      console.log(response.status)

      if (response.status == 200) {
        this.getListEvent()
        message.success('Xóa dữ liệu thành công', 3)
      }
    },
    async deleteRemind(id) {
      const store = useRemindStore()
      const response = await store.deleteRemind(id)
      console.log(response.status)

      if (response.status == 200) {
        this.getListEvent()
        message.success('Xóa dữ liệu thành công', 3)
      }
    },
    remove(item) {
      const index = this.formState.ReminderOffsets.indexOf(item)
      if (index !== -1) {
        this.formState.ReminderOffsets.splice(index, 1)
      }
    },
    addItem() {
      this.formState.ReminderOffsets.push({
        offsetUnit: 1,
        offsetValue: 1
      })
    },
    async onFinish() {
      await this.submitz()

      await this.getListEvent()
      this.valueDate = dayjs()
      this.getListEvent()
    },
    onFinishFailed(errorInfo) {
      console.log('Failed:', errorInfo)
    },
    async submitz() {
      var obj = this.formState
      console.log(obj)
      try {
        console.log(obj)

        obj.EventDateTime = dayjs(obj.EventDateTime).format('YYYY-MM-DD')
        obj.RepeatEndDate = dayjs(obj.RepeatEndDate).format('YYYY-MM-DD')
        console.log(obj.RepeatEndDate)
      } catch (error) {
        message.error('Các trường dữ liệu thời gian trống')
        return
      }
      if (this.mayForm == 0) {
        const store = await useRemindStore()
        const result = await store.AddNewRemind(obj)
        console.log(result.status)
        let chuSoA = Math.floor(result.status / 100)
        if (chuSoA != 2) {
          message.error('Hãy kiểm tra lại input của bạn!')
          return
        }
        this.onClose()
      } else {
        console.log('loghere', obj)
        const store = await useRemindStore()
        const result = await store.updateRemind(obj)
        console.log('Update remind', result)
        this.onClose()
      }
    },
    editRemind(obj) {
      this.mayForm = 1
      this.titleEvent = 'Chỉnh sửa sự kiện'
      this.formState = {
        eventId: obj.eventId,
        Title: obj.title,
        EventDateTime: obj.eventDateTime,
        StartTime: obj.startTime,
        EndTime: obj.endTime,
        Location: obj.location,
        RepeatFrequency: obj.repeatFrequency,
        RepeatEndDate: obj.repeatEndDate,
        Description: obj.description,
        ReminderOffsets: obj.reminderOffsets ? obj.reminderOffsets : []
      }

      console.log(obj)
      this.open = !this.open
    },
    showDrawer() {
      this.mayForm = 0
      this.titleEvent = 'Tạo một sự kiện mới'
      this.formState = {
        Title: '',
        EventDateTime: '',
        StartTime: '',
        EndTime: '',
        Location: '',
        RepeatFrequency: 0,
        RepeatEndDate: '',
        Description: '',
        ReminderOffsets: []
      }
      this.open = !this.open
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
      // return dayjs(date).format('YYYY-MM-DDT00:00:00')
      return dayjs(date).format('YYYY-MM-DD')
    },
    onClose() {
      this.open = false
    },
    convertEndDate(date) {
      // return dayjs(date).endOf('day').format('YYYY-MM-DDT23:59:59')
      return dayjs(date).endOf('day').format('YYYY-MM-DD')
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
