<template>
  <a-layout style="padding: 30px 50px">
    <a-layout-content
      :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '10px' }"
    >
      <a-typography-title :level="3">Lịch hẹn của bạn</a-typography-title>
      <a-table :dataSource="listApointment" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'status'">
            <!-- status: success | processing | default | error | warning -->
            <a-badge
              :status="record.status == 'Pending' ? 'processing' : 'success'"
              :text="record.status"
            />
          </template>
          <template v-if="column.dataIndex === 'date'">
            <span>{{ formatDate(record.date) }}</span>
          </template>

          <template v-if="column.dataIndex === 'call'">
            <button
              :disabled="!isValid(record)"
              class="btn btn-success"
              @click="handleCall(record.customerId, record.doctorId)"
            >
              Gọi
            </button>
          </template>
        </template>
      </a-table>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { useApointment } from '@/stores/ApointmentManagement'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'
import axios from 'axios'
import { isValid } from 'date-fns'
import { ref } from 'vue'
const API_URL = import.meta.env.VITE_API_URL_DOTNET

export default {
  mounted() {
    this.loadData()
  },
  methods: {
    formatDate(date) {
      if (!date) return ''
      const d = new Date(date)
      const day = String(d.getDate()).padStart(2, '0')
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const year = d.getFullYear()
      return `${day}-${month}-${year}`
    },
    async loadData() {
      const user = useApointment()
      var res = await user.getAppointmentUser(1, 10)
      this.listApointment = res.data.items
      console.log(this.listApointment)
      console.log('list appoint', this.listApointment)
    },
    handleCall(customerId, doctorId) {
      const url = `https://manhvv15.github.io/CallCustomer/?doctorId=${doctorId}&customerId=${customerId}`
      window.open(url, '_blank')
    },
    isValid(record) {
      if (record.status !== 'Approved') {
        return false
      }
      var now = new Date()
      var current = new Date(record.date)
      const [hours, minutes, seconds] = record.endTime.split(':').map(Number)
      current.setHours(hours, minutes, seconds)
      console.log('Now: ' + now + ' Current: ' + current)
      if (current < now) {
        return false
      }
      return true
    }
  },
  data() {
    return {
      listApointment: ref([]),
      columns: [
        {
          title: 'STT',
          dataIndex: 'key',
          key: 'key',
          width: 40
        },
        {
          title: 'Tiêu đề',
          dataIndex: 'title',
          key: 'title',
          width: 350
        },
        {
          title: 'Mô tả',
          dataIndex: 'description',
          key: 'description',
          width: 450
        },
        {
          title: 'Ngày hẹn',
          dataIndex: 'date',
          key: 'date',
          width: 150
        },
        {
          title: 'Giờ bắt đầu',
          dataIndex: 'startTime',
          key: 'startTime',
          width: 100
        },
        {
          title: 'Giờ kết thúc',
          dataIndex: 'endTime',
          key: 'endTime',
          width: 100
        },
        {
          title: 'Vị trí',
          dataIndex: 'location',
          key: 'location',
          width: 300
        },
        {
          title: 'Trạng thái',
          dataIndex: 'status',
          key: 'status',
          width: 100
        },
        {
          title: 'Call',
          dataIndex: 'call',
          key: 'call',
          width: 200
        }
      ]
    }
  }
}
</script>
