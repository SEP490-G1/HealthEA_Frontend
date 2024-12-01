<template>
  <div class="container-fluid p-4">
    <a-card title="Tạo lịch làm việc" class="mb-4">
      <a-form layout="vertical" @submit="handleSubmit">
        <a-form-item label="Ngày" required>
          <a-date-picker v-model:value="form.date" placeholder="Chọn ngày" class="w-100" />
        </a-form-item>
        <a-form-item label="Thời gian bắt đầu" required>
          <a-time-picker
            v-model:value="form.startTime"
            placeholder="Chọn thời gian bắt đầu"
            format="HH:mm"
            class="w-100"
          />
        </a-form-item>
        <a-form-item label="Thời gian kết thúc" required>
          <a-time-picker
            v-model:value="form.endTime"
            placeholder="Chọn thời gian kết thúc"
            format="HH:mm"
            class="w-100"
          />
        </a-form-item>
        <a-form-item label="Thời lượng mỗi khung (phút)" required>
          <a-input-number
            v-model:value="form.slotDurationInMinutes"
            min="5"
            max="120"
            placeholder="Nhập thời lượng mỗi khung"
            class="w-100"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="me-3" :loading="isSubmitting">
            Tạo lịch
          </a-button>
          <a-button type="default" @click="resetForm">Làm mới</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { Card, Form, DatePicker, TimePicker, InputNumber, Button, message } from 'ant-design-vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
const API_URL = import.meta.env.VITE_API_URL_DOTNET

export default {
  components: {
    'a-card': Card,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-date-picker': DatePicker,
    'a-time-picker': TimePicker,
    'a-input-number': InputNumber,
    'a-button': Button
  },
  data() {
    return {
      form: {
        date: null,
        startTime: null,
        endTime: null,
        slotDurationInMinutes: null
      },
      isSubmitting: false
    }
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      this.isSubmitting = true

      const userStore = useUserStore()
      const doctorId = this.$route.params.id // Assuming doctorId is part of the route params

      const payload = {
        doctorId,
        date: this.form.date ? this.form.date.format('YYYY-MM-DD') : null,
        startTime: this.form.startTime ? this.form.startTime.format('HH:mm:ss') : null, // Ensure TimeSpan-compatible format
        endTime: this.form.endTime ? this.form.endTime.format('HH:mm:ss') : null, // Ensure TimeSpan-compatible format
        slotDurationInMinutes: this.form.slotDurationInMinutes
      }

      try {
        await axios.post(`${API_URL}/api/Schedules`, payload, {
          headers: { Authorization: `Bearer ${userStore.token}` }
        })
        message.success('Lịch làm việc đã được tạo thành công!')
      } catch (error) {
        console.error('Lỗi khi tạo lịch làm việc:', error)
        message.error('Không thể tạo lịch làm việc. Vui lòng thử lại sau.')
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

<style scoped>
.container-fluid {
  padding: 1rem;
}
</style>
