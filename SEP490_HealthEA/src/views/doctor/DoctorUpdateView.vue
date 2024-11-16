<template>
  <div class="w-full">
    <a-card title="Cập nhật thông tin bác sĩ" class="doctor-update-card">
      <form @submit.prevent="updateDoctorInfo">
        <a-form layout="vertical">
          <a-form-item label="Họ và tên">
            <a-input
              v-model:value="doctorInfo.displayName"
              placeholder="Nhập họ và tên của bạn"
            />
          </a-form-item>
          <a-form-item label="Mô tả">
            <a-textarea
              v-model:value="doctorInfo.description"
              rows="4"
              placeholder="Nhập mô tả ngắn gọn"
            />
          </a-form-item>
          <a-form-item label="Chuyên môn">
            <a-input
              v-model:value="doctorInfo.specialization"
              placeholder="Nhập chuyên môn của bạn"
            />
          </a-form-item>
          <a-form-item label="Địa chỉ phòng khám">
            <a-input
              v-model:value="doctorInfo.clinicAddress"
              placeholder="Nhập địa chỉ phòng khám của bạn"
            />
          </a-form-item>
          <a-form-item label="Thành phố">
            <a-input
              v-model:value="doctorInfo.clinicCity"
              placeholder="Nhập thành phố của phòng khám"
            />
          </a-form-item>
          <div class="d-flex justify-content-end mt-3">
            <a-button type="primary" @click="updateDoctorInfo">Lưu thay đổi</a-button>
          </div>
        </a-form>
      </form>
    </a-card>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user';
import { Card, Form, Input, Button, message } from 'ant-design-vue';
import axios from 'axios';

export default {
  components: {
    'a-card': Card,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-textarea': Input.TextArea,
    'a-button': Button,
  },
  data() {
    return {
      doctorInfo: {
        displayName: '',
        description: '',
        specialization: '',
        clinicAddress: '',
        clinicCity: '',
      },
    };
  },
  async created() {
    const userStore = useUserStore();
    try {
      const response = await axios.get('http://localhost:5217/api/Doctor/me', {
        headers: { Authorization: `Bearer ${userStore.token}` },
      });
      const data = response.data;
      if (data) {
        this.doctorInfo = {
          displayName: data.displayName || '',
          description: data.description || '',
          specialization: data.specialization || '',
          clinicAddress: data.clinicAddress || '',
          clinicCity: data.clinicCity || '',
        };
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin bác sĩ:', error);
    }
  },
  methods: {
    async updateDoctorInfo() {
      const userStore = useUserStore();
      try {
        await axios.put('http://localhost:5217/api/Doctor/me', this.doctorInfo, {
          headers: { Authorization: `Bearer ${userStore.token}` },
        });
        message.success('Cập nhật hồ sơ thành công');
      } catch (error) {
        console.error('Lỗi khi cập nhật hồ sơ:', error);
        message.error('Không thể cập nhật hồ sơ');
      }
    },
  },
};
</script>

<style scoped>
.update-doctor-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}

.doctor-update-card {
  width: 100%;
}
</style>
