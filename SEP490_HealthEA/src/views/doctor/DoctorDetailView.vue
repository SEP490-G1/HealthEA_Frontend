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
              <router-link
                class="btn btn-danger"
                :to="`/report?type=doctor&id=${$route.params.id}`"
              >
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
              @click="openAppointmentModal(hour)"
            >
              {{ hour }}
            </a-button>
          </div>
          <p v-else>Không có giờ trống cho ngày này</p>
        </a-card>
      </div>

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
</template>

<script>
import { Avatar, Typography, Card, DatePicker, List, Button, Modal, Form, Input, Select } from 'ant-design-vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user';

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
    'a-button': Button,
    'a-modal': Modal,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-select': Select,
    'a-select-option': Select.Option,
  },
  data() {
    return {
      doctor: null,
      workHistory: [],
      selectedDate: null,
      availableHours: [],
      isModalVisible: false,
      appointmentData: {
        title: '',
        description: '',
        type: '',
        startTime: '',
      },
    };
  },
  methods: {
    async fetchDoctorDetails() {
      const doctorId = this.$route.params.id;
      const userStore = useUserStore();
      try {
        const response = await axios.get(`http://localhost:5217/api/Doctor/${doctorId}`, {
          headers: { Authorization: `Bearer ${userStore.token}` },
        });
        this.doctor = response.data || {};
        this.workHistory = this.doctor.historyOfWork ? JSON.parse(this.doctor.historyOfWork) : [];
      } catch (error) {
        console.error('Lỗi khi lấy thông tin bác sĩ:', error);
        this.$router.push('/error/404');
      }
    },
    googleMapsLink(address, city) {
      const fullAddress = address ? `${address}, ${city}` : city;
      return `https://www.google.com/maps/search/?q=${encodeURIComponent(fullAddress)}`;
    },
    async fetchAvailableHours() {
      if (!this.selectedDate) return;

      const formattedDate = this.selectedDate.format('YYYY-MM-DD');
      const doctorId = this.$route.params.id;
      const userStore = useUserStore();

      try {
        const response = await axios.get(`http://localhost:5217/api/Schedules/by-day`, {
          params: { date: formattedDate, doctorId },
          headers: { Authorization: `Bearer ${userStore.token}` },
        });
        
        this.availableHours = response.data.map((schedule) => schedule.startTime);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.availableHours = [];
        } else {
          console.error('Lỗi khi lấy lịch trống:', error);
        }
      }
    },
    openAppointmentModal(hour) {
      this.appointmentData.startTime = hour;
      this.isModalVisible = true;
    },
    async createAppointment() {
      const doctorId = this.$route.params.id;
      const userStore = useUserStore();
      const appointment = {
        doctorId,
        title: this.appointmentData.title,
        description: this.appointmentData.description,
        type: this.appointmentData.type,
        date: this.selectedDate.format('YYYY-MM-DD'),
        startTime: this.appointmentData.startTime,
      };

      try {
        await axios.post('http://localhost:5217/api/Appointments', appointment, {
          headers: { Authorization: `Bearer ${userStore.token}` },
        });
        this.isModalVisible = false;
        this.$message.success('Cuộc hẹn đã được đặt thành công!');
      } catch (error) {
        console.error('Lỗi khi tạo cuộc hẹn:', error);
        this.$message.error('Không thể tạo cuộc hẹn. Vui lòng thử lại sau.');
      }
    },
  },
  created() {
    this.fetchDoctorDetails();
  },
};
</script>

<style scoped>
.container-fluid {
  padding: 1rem;
}
</style>
