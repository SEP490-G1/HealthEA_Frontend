<template>
  <div class="container-fluid p-4">
    <div class="row gx-4">
      <!-- Doctor Information Section -->
      <div class="col-md-6">
        <a-card bordered>
          <div class="d-flex align-items-center mb-4">
            <a-avatar
              :size="150"
              :src="doctor?.profileImage || 'https://via.placeholder.com/150'"
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
              <router-link class="btn btn-danger" :to="`/report?type=doctor&id=${$route.params.id}`">
                Báo cáo bác sĩ
              </router-link>
            </div>
          </div>

          <!-- Appointment and Video Call Info -->
          <div class="d-flex gap-3 mb-4">
            <a-card class="flex-fill text-center">
              <p><strong>Số lần hẹn:</strong> {{ doctor?.numberOfAppointments || 0 }}</p>
            </a-card>
            <a-card class="flex-fill text-center">
              <p><strong>Cuộc gọi video:</strong> {{ doctor?.numberOfVideoCalls || 0 }}</p>
            </a-card>
          </div>

          <!-- Clinic Address Section -->
          <div class="mb-4">
            <h3>Địa chỉ phòng khám</h3>
            <p v-if="doctor?.clinicAddress && doctor?.clinicCity">
              <a :href="googleMapsLink(doctor.clinicAddress, doctor.clinicCity)" target="_blank">
                <strong>{{ doctor.clinicAddress }}</strong>, {{ doctor.clinicCity }}
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
            <a-list
              v-if="workHistory && workHistory.length > 0"
              :data-source="workHistory"
              bordered
              item-layout="vertical"
            >
              <template v-slot:item="{ item }">
                <a-list-item>
                  <a-list-item-meta
                    :title="`${item.yearStart || 'N/A'} - ${item.yearEnd || 'N/A'}`"
                    :description="item.job || 'Chức danh không có sẵn'"
                  />
                </a-list-item>
              </template>
            </a-list>
            <p v-else>Không có lịch sử làm việc</p>
          </div>
        </a-card>
      </div>

      <!-- Appointment Scheduling Section -->
      <div class="col-md-6">
        <a-card title="Đặt lịch hẹn">
          <a-date-picker
            v-model="selectedDate"
            @change="fetchAvailableHours"
            placeholder="Chọn ngày"
            class="w-100 mb-3"
          />
          <a-list
            v-if="availableHours && availableHours.length > 0"
            bordered
            :data-source="availableHours"
            item-layout="horizontal"
            v-slot="{ item }"
          >
            <a-list-item>{{ item || 'Không có sẵn' }}</a-list-item>
          </a-list>
          <p v-else>Không có giờ trống cho ngày này</p>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import { Avatar, Typography, Card, DatePicker, List, Button } from 'ant-design-vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  components: {
    'a-avatar': Avatar,
    'a-typography-title': Typography.Title,
    'a-typography-text': Typography.Text,
    'a-typography-paragraph': Typography.Paragraph,
    'a-card': Card,
    'a-date-picker': DatePicker,
    'a-list': List,
    'a-list-item': List.Item,
    'a-list-item-meta': List.Item.Meta,
    'a-button': Button
  },
  data() {
    return {
      doctor: null,
      workHistory: [],
      selectedDate: null,
      availableHours: []
    }
  },
  methods: {
    async fetchDoctorDetails() {
      const doctorId = this.$route.params.id
      try {
        const response = await axios.get(`http://localhost:5217/api/Doctor/${doctorId}`)
        this.doctor = response.data || {}
        this.workHistory = this.doctor.historyOfWork ? JSON.parse(this.doctor.historyOfWork) : []
      } catch (error) {
        console.error('Lỗi khi lấy thông tin bác sĩ:', error)
        this.$router.push("/error/404")
      }
    },
    googleMapsLink(address, city) {
      const fullAddress = address ? `${address}, ${city}` : city
      return `https://www.google.com/maps/search/?q=${encodeURIComponent(fullAddress)}`
    },
    fetchAvailableHours() {
      if (this.selectedDate) {
        this.availableHours = [
          '09:00 AM - 10:00 AM',
          '11:00 AM - 12:00 PM',
          '02:00 PM - 03:00 PM',
          '04:00 PM - 05:00 PM'
        ]
      } else {
        this.availableHours = []
      }
    }
  },
  created() {
    this.fetchDoctorDetails()
  }
}
</script>
