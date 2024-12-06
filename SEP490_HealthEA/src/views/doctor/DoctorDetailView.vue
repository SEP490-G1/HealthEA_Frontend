<template>
  <ContentFooter>
    <div class="container-fluid p-4">
      <div class="row gx-4">
        <!-- Doctor Information Section -->
        <div class="col-md-6">
          <a-card bordered>
            <div class="d-flex align-items-center mb-4">
              <a-avatar
                :size="150"
                :src="doctor?.user?.avatar || 'https://via.placeholder.com/150'"
                class="me-3"
              />
              <div>
                <a-typography-title level="1" class="mb-1">
                  {{ doctor?.displayName || 'Tên bác sĩ' }}
                </a-typography-title>
                <a-typography-text type="secondary" class="text-muted d-block mb-2">
                  {{ doctor?.specialization || 'Chuyên môn không có sẵn' }}
                </a-typography-text>
                <a-typography-paragraph class="mb-2">
                  {{ doctor?.description || 'Mô tả không có sẵn' }}
                </a-typography-paragraph>
                <div v-if="!isDoctor">
                  <router-link
                    class="btn btn-danger"
                    :to="`/report?type=doctor&id=${$route.params.id}`"
                  >
                    Báo cáo bác sĩ
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Clinic Address Section -->
            <div class="mb-4">
              <h3>Địa chỉ phòng khám</h3>
              <p v-if="doctor?.clinicAddress && doctor?.clinicCity">
                <a :href="googleMapsLink(doctor.clinicAddress, doctor.clinicCity)" target="_blank">
                  <strong>{{ doctor.clinicAddress }}</strong
                  >, {{ doctor.clinicCity }}
                </a>
              </p>
              <p v-else-if="doctor?.clinicCity">
                <a :href="googleMapsLink('', doctor.clinicCity)" target="_blank">
                  {{ doctor.clinicCity }}
                </a>
              </p>
              <p v-else>Không có địa chỉ phòng khám</p>
            </div>

            <!-- Work History Section -->
            <div>
              <h2>Lịch sử làm việc</h2>
              <ul v-if="workHistory && workHistory.length > 0" class="list-group">
                <li
                  v-for="item in workHistory"
                  :key="item.id || `${item.yearStart}-${item.yearEnd}`"
                  class="list-group-item"
                >
                  <div>
                    <h5>{{ item.yearStart || 'N/A' }} - {{ item.yearEnd || 'N/A' }}</h5>
                    <p class="mb-0 text-muted">{{ item.job || 'Chức danh không có sẵn' }}</p>
                  </div>
                </li>
              </ul>
              <p v-else>Không có lịch sử làm việc</p>
            </div>
          </a-card>
        </div>

        <div class="col-md-6">
          <a-card title="Đặt lịch hẹn">
            <a-date-picker
              v-model:value="selectedDate"
              @change="fetchAvailableHours"
              placeholder="Chọn ngày"
              class="w-100 mb-3"
            />
            <div v-if="availableHours.length > 0" class="d-flex flex-wrap gap-2">
              <a-button
                v-for="(hour, index) in availableHours"
                :key="index"
                type="primary"
                class="mb-2"
                @click="handleScheduleClick(hour.id, hour.startTime)"
              >
                {{ hour.startTime }}
              </a-button>
            </div>
            <p v-else>Không có giờ trống cho ngày này</p>
            <!-- Add Schedule Button -->
            <div v-if="isDoctor" class="mt-3">
              <a-button type="dashed" block @click="$router.push('/doctors/schedules/add')">
                Thêm lịch làm việc
              </a-button>
            </div>
            <div v-if="isDoctor" class="mt-3">
              <a-button type="dashed" block @click="$router.push('/doctors/update')">
                Chỉnh sửa thông tin
              </a-button>
            </div>
            <div v-if="isDoctor" class="mt-3">
              <a-button type="dashed" block @click="$router.push('/doctor/apoinemnt')">
                Xem yêu cầu khám bệnh từ khách hàng
              </a-button>
            </div>
          </a-card>
        </div>

        <!-- Confirmation Modal for Deleting Schedule -->
        <a-modal
          v-model:visible="isDeleteModalVisible"
          title="Xác nhận xoá lịch"
          @ok="deleteSchedule"
          @cancel="isDeleteModalVisible = false"
        >
          <p>Bạn có chắc chắn muốn xoá lịch hẹn này?</p>
        </a-modal>

        <!-- Appointment Confirmation Modal -->
        <a-modal
          v-model:visible="isModalVisible"
          title="Xác nhận cuộc hẹn"
          @ok="createAppointment"
          @cancel="isModalVisible = false"
        >
          <a-form layout="vertical">
            <a-form-item label="Tiêu đề">
              <a-input v-model:value="appointmentData.title" placeholder="Nhập tiêu đề" />
            </a-form-item>
            <a-form-item label="Mô tả">
              <a-input v-model:value="appointmentData.description" placeholder="Nhập mô tả" />
            </a-form-item>
            <a-form-item label="Loại">
              <a-select v-model:value="appointmentData.type" placeholder="Chọn loại cuộc hẹn">
                <a-select-option value="Online">Online</a-select-option>
                <a-select-option value="Offline">Offline</a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </div>
  </ContentFooter>
</template>

<script>
import {
  Avatar,
  Typography,
  Card,
  DatePicker,
  List,
  Button,
  Modal,
  Form,
  Input,
  Select
} from 'ant-design-vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

import ContentFooter from '@/components/layout/ContentFooter'
const API_URL = import.meta.env.VITE_API_URL_DOTNET

export default {
  components: {
    ContentFooter,
    'a-avatar': Avatar,
    'a-typography-title': Typography.Title,
    'a-typography-text': Typography.Text,
    'a-typography-paragraph': Typography.Paragraph,
    'a-card': Card,
    'a-date-picker': DatePicker,
    'a-list': List,
    'a-list-item': List.Item,
    'a-list-item-meta': List.Item.Meta,
    'a-button': Button,
    'a-modal': Modal,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-select': Select,
    'a-select-option': Select.Option
  },
  data() {
    return {
      doctor: null,
      workHistory: [],
      selectedDate: null,
      availableHours: [],
      isModalVisible: false,
      isDeleteModalVisible: false,
      appointmentData: {
        title: '',
        description: '',
        type: '',
        startTime: ''
      },
      deleteScheduleId: null,
      isDoctor: false
    }
  },
  methods: {
    async fetchDoctorDetails() {
      const doctorId = this.$route.params.id
      const userStore = useUserStore()
      try {
        const response = await axios.get(`${API_URL}/api/Doctor/${doctorId}`, {
          headers: { Authorization: `Bearer ${userStore.token}` }
        })
        this.doctor = response.data || {}
        try {
          this.workHistory = this.doctor.historyOfWork ? JSON.parse(this.doctor.historyOfWork) : []
        } catch (error) {
          this.workHistory = []
        }
        this.checkIfUserIsDoctor()
      } catch (error) {
        console.error('Lỗi khi lấy thông tin bác sĩ:', error)
        this.$router.push('/error/404')
      }
    },
    async checkIfUserIsDoctor() {
      const doctorId = this.$route.params.id
      const userStore = useUserStore()
      try {
        const response = await axios.get(`${API_URL}/api/Schedules/is-user/${doctorId}`, {
          headers: { Authorization: `Bearer ${userStore.token}` }
        })
        if (response.status === 200) {
          this.isDoctor = true // User is the doctor
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra người dùng:', error)
        this.isDoctor = false
      }
    },
    googleMapsLink(address, city) {
      const fullAddress = address ? `${address}, ${city}` : city
      return `https://www.google.com/maps/search/?q=${encodeURIComponent(fullAddress)}`
    },
    async fetchAvailableHours() {
      if (!this.selectedDate) return

      const formattedDate = this.selectedDate.format('YYYY-MM-DD')
      const doctorId = this.$route.params.id
      const userStore = useUserStore()

      try {
        const response = await axios.get(`${API_URL}/api/Schedules/by-day`, {
          params: { date: formattedDate, doctorId },
          headers: { Authorization: `Bearer ${userStore.token}` }
        })

        this.availableHours = response.data.map((schedule) => ({
          id: schedule.scheduleId,
          startTime: schedule.startTime
        }))
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.availableHours = []
        } else {
          console.error('Lỗi khi lấy lịch trống:', error)
        }
      }
    },
    handleScheduleClick(scheduleId, startTime) {
      console.log(scheduleId)
      if (this.isDoctor) {
        this.deleteScheduleId = scheduleId
        this.isDeleteModalVisible = true
      } else {
        this.openAppointmentModal(startTime)
      }
    },
    openAppointmentModal(hour) {
      this.appointmentData.startTime = hour
      this.isModalVisible = true
    },
    async deleteSchedule() {
      if (!this.deleteScheduleId) return

      const userStore = useUserStore()

      try {
        await axios.delete(`${API_URL}/api/Schedules/${this.deleteScheduleId}`, {
          headers: { Authorization: `Bearer ${userStore.token}` }
        })
        this.$message.success('Xoá lịch thành công!')
        this.isDeleteModalVisible = false
        this.fetchAvailableHours() // Refresh the schedule list
      } catch (error) {
        console.error('Lỗi khi xoá lịch:', error)
        this.$message.error('Không thể xoá lịch. Vui lòng thử lại sau.')
      }
    },
    async createAppointment() {
      const doctorId = this.$route.params.id
      const userStore = useUserStore()
      const appointment = {
        doctorId,
        title: this.appointmentData.title,
        description: this.appointmentData.description,
        type: this.appointmentData.type,
        date: this.selectedDate.format('YYYY-MM-DD'),
        startTime: this.appointmentData.startTime
      }

      try {
        await axios.post(`${API_URL}/api/Appointments`, appointment, {
          headers: { Authorization: `Bearer ${userStore.token}` }
        })
        this.isModalVisible = false
        this.$message.success('Cuộc hẹn đã được đặt thành công!')
        this.fetchAvailableHours()
      } catch (error) {
        console.error('Lỗi khi tạo cuộc hẹn:', error)
        this.$message.error('Không thể tạo cuộc hẹn. Vui lòng thử lại sau.')
      }
    }
  },
  created() {
    this.fetchDoctorDetails()
  }
}
</script>

<style scoped>
.container-fluid {
  padding: 1rem;
}
</style>
