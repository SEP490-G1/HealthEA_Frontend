<template>
  <div>
    <a-typography-title :level="3">Lịch hẹn của bạn</a-typography-title>
    <a-table :dataSource="listApointment" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'nameCustomer'">
          <span style="color: blue; cursor: pointer" @click="showUserInfo(record)">
            {{ record[column.dataIndex] }}
          </span>
        </template>

        <template v-if="column.dataIndex === 'status'">
          <a-badge
            :status="
              record.status === 'Approved'
                ? 'success'
                : record.status === 'Pending'
                  ? 'processing'
                  : 'error'
            "
            :text="
              record.status === 'Approved'
                ? 'Chấp nhận'
                : record.status === 'Pending'
                  ? 'Đang xử lí'
                  : 'Từ chối'
            "
          />
        </template>
        <template v-if="column.dataIndex === 'date'">
          <span>{{ formatDate(record.date) }}</span>
        </template>

        <template v-if="column.dataIndex === 'action' && record.status === 'Pending'">
          <div class="editable-cell">
            <div>
              <a-popconfirm
                v-if="record.status === 'Pending'"
                title="Bạn có xác nhận là chấp nhận lịch hẹn không?"
                @confirm="approve(record.appointmentId)"
                class="text-success"
              >
                <a-typography-link>Chấp nhận</a-typography-link>
              </a-popconfirm>
            </div>
            <div>
              <a-popconfirm
                v-if="record.status === 'Pending'"
                title="Bạn có xác nhận là từ chối lịch hẹn không?"
                @confirm="reject(record.appointmentId)"
                class="text-danger"
              >
                <a-typography-link>Từ chối</a-typography-link>
              </a-popconfirm>
            </div>
          </div>
        </template>

        <template v-if="column.dataIndex === 'call'">
          <button
            :disabled="!isValid(record)"
            class="btn btn-primary"
            @click="handleCall(record.customerId, record.doctorId)"
          >
            Gọi
          </button>
        </template>
      </template>
    </a-table>
  </div>

  <!-- Modal hiển thị thông tin khách hàng -->
  <a-modal
    v-model:visible="isModalVisible"
    title="Thông tin khách hàng"
    @cancel="isModalVisible = false"
    @ok="isModalVisible = false"
    width="600px"
  >
    <a-form :model="userInfo" layout="vertical">
      <a-form-item label="Tên"><a-input v-model:value="userInfo.name" disabled /></a-form-item>
      <a-form-item label="Giới tính"
        ><a-input :value="userInfo.gender || 'Không xác định'" disabled
      /></a-form-item>
      <a-form-item label="Ngày sinh"
        ><a-input v-model:value="formattedDob" disabled placeholder="YYYY/mm/dd"
      /></a-form-item>
      <a-form-item label="Email"><a-input v-model:value="userInfo.email" disabled /></a-form-item>
      <a-form-item label="Số điện thoại"
        ><a-input v-model:value="userInfo.phone" disabled
      /></a-form-item>
      <div>
        <router-link v-if="currentRecord.uri != null" :to="currentRecord.uri" class="btn btn-primary">
            Xem hồ sơ sức khỏe của bệnh nhân
          </router-link>
          <div v-else class="text-danger">Bệnh nhân không đính kèm hồ sơ sức khỏe!</div>
      </div>
    </a-form>
  </a-modal>
</template>

<script>
import { useApointment } from '@/stores/ApointmentManagement'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL_DOTNET

export default {
  mounted() {
    this.loadData()
  },
  data() {
    return {
      listApointment: [],
      userInfo: null,
      currentRecord: null,
      isModalVisible: false,
      columns: [
        { title: 'Tên bệnh nhân', dataIndex: 'nameCustomer', key: 'nameCustomer', width: 150 },
        { title: 'Tiêu đề', dataIndex: 'title', key: 'title', width: 350 },
        { title: 'Mô tả', dataIndex: 'description', key: 'description', width: 450 },
        {
          title: 'Ngày hẹn',
          dataIndex: 'date',
          key: 'date',
          width: 170
        },

        { title: 'Giờ bắt đầu', dataIndex: 'startTime', key: 'startTime', width: 100 },
        { title: 'Giờ kết thúc', dataIndex: 'endTime', key: 'endTime', width: 100 },
        // { title: 'Vị trí', dataIndex: 'location', key: 'location', width: 300 },
        { title: 'Trạng thái', dataIndex: 'status', key: 'status', width: 200 },
        { title: 'Hành động', dataIndex: 'action', key: 'action', width: 250 },
        { title: 'Call', dataIndex: 'call', key: 'call', width: 200 }
      ]
    }
  },
  computed: {
    formattedDob: {
      get() {
        if (this.userInfo?.dob) {
          console.log('dob:', this.userInfo.dob)

          let date
          if (typeof this.userInfo.dob === 'string') {
            date = new Date(this.userInfo.dob)
          } else if (this.userInfo.dob instanceof Date) {
            date = this.userInfo.dob
          }

          if (date && !isNaN(date.getTime())) {
            const day = String(date.getDate()).padStart(2, '0')
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const year = date.getFullYear()
            return `${day}/${month}/${year}`
          }
        }
        return ''
      },
      set(value) {
        const [day, month, year] = value.split('/')
        if (day && month && year) {
          const dob = new Date(`${year}-${month}-${day}`)
          if (!isNaN(dob.getTime())) {
            this.userInfo.dob = dob.toISOString().split('T')[0]
          }
        }
      }
    }
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
    async showUserInfo(record) {
      try {
        const response = await axios.get(`${API_URL}/api/Infors/${record.customerId}`)
        this.userInfo = response.data
        this.currentRecord = record
        this.isModalVisible = true
      } catch {
        message.error('Không thể lấy thông tin người dùng.')
      }
    },

    async approve(id) {
      const userStore = useUserStore()
      try {
        await axios.post(
          `${API_URL}/api/Appointments/approve/${id}`,
          { appointmentId: id },
          {
            headers: { Authorization: `Bearer ${userStore.token}` }
          }
        )
        message.success('Đã chấp nhận yêu cầu.')
        await this.loadData()
      } catch {
        message.error('Có lỗi xảy ra.')
      }
    },

    async reject(id) {
      const userStore = useUserStore()
      try {
        await axios.post(
          `${API_URL}/api/Appointments/reject/${id}`,
          { appointmentId: id },
          {
            headers: { Authorization: `Bearer ${userStore.token}` }
          }
        )
        message.success('Đã từ chối yêu cầu.')
        await this.loadData()
      } catch {
        message.error('Có lỗi xảy ra.')
      }
    },

    async loadData() {
      const user = useApointment()
      const res = await user.getApoinmentDoctor(1, 10)
      this.listApointment = []
      for (let i = 1; i <= res.data.totalPages; i++) {
        const response = await user.getApoinmentDoctor(i, 10)
        this.listApointment.push(...response.data.items)
      }
    },
    getFullUri(uri) {
      const baseUrl = import.meta.env.VITE_URL_FE || 'http://localhost:5173'
      return `${baseUrl}${uri}`
    },
    handleCall(customerId, doctorId) {
      const url = `https://manhvv15.github.io/DoctorCall/?doctorId=${doctorId}&customerId=${customerId}`
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
  }
}
</script>

<style lang=""></style>
