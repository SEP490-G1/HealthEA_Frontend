<template>
  <div class="w-full">
    <a-card title="Cập nhật thông tin bác sĩ" class="doctor-update-card">
      <form @submit.prevent="updateDoctorInfo">
        <a-form layout="vertical">
          <a-form-item label="Họ và tên">
            <a-input v-model:value="doctorInfo.displayName" placeholder="Nhập họ và tên của bạn" />
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
          <div>
            <div
              v-for="(work, index) in historyOfWork"
              :key="index"
              class="work-entry row mb-3 align-items-start"
            >
              <!-- Năm bắt đầu -->
              <div class="col-md-3">
                <label for="yearStart" class="form-label">Năm bắt đầu</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="work.yearStart"
                  :min="1900"
                  :max="new Date().getFullYear()"
                  placeholder="Năm bắt đầu"
                  id="yearStart"
                />
              </div>

              <!-- Năm kết thúc -->
              <div class="col-md-3">
                <label for="yearEnd" class="form-label">Năm kết thúc</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="work.yearEnd"
                  :min="work.yearStart"
                  :max="new Date().getFullYear()"
                  placeholder="Năm kết thúc"
                  id="yearEnd"
                />
              </div>

              <!-- Công việc -->
              <div class="col-md-4">
                <label for="job" class="form-label">Công việc</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="work.job"
                  placeholder="Mô tả công việc"
                  id="job"
                />
              </div>

              <!-- Action Buttons -->
              <div class="col-md-2 d-flex flex-row">
                <button
                  type="button"
                  class="btn btn-outline-primary mb-2"
                  @click="moveWorkUp(index)"
                  :disabled="index === 0"
                >
                ↑
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary mb-2"
                  @click="moveWorkDown(index)"
                  :disabled="index === doctorInfo.historyOfWork.length - 1"
                >
                ↓
                </button>
                <button type="button" class="btn btn-outline-danger" @click="removeWork(index)">
                  X
                </button>
              </div>
            </div>
            <a-button type="dashed" block @click="addWork">Thêm mục mới</a-button>
          </div>
          <div class="d-flex justify-content-end mt-3">
            <a-button type="primary" @click="updateDoctorInfo">Lưu thay đổi</a-button>
          </div>
        </a-form>
      </form>
    </a-card>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { Card, Form, Input, Button, message } from 'ant-design-vue'
import axios from 'axios'

export default {
  components: {
    'a-card': Card,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-textarea': Input.TextArea,
    'a-button': Button
  },
  data() {
    return {
      doctorInfo: {
        displayName: '',
        description: '',
        specialization: '',
        clinicAddress: '',
        clinicCity: '',
        historyOfWork: '[]'
      },
      historyOfWork: []
    }
  },
  async created() {
    const userStore = useUserStore()
    try {
      const response = await axios.get('http://localhost:5217/api/Doctor/me', {
        headers: { Authorization: `Bearer ${userStore.token}` }
      })
      const data = response.data
      if (data) {
        try {
          this.historyOfWork = JSON.parse(data.historyOfWork)
        } catch {
          this.historyOfWork = []
        }
        this.doctorInfo = {
          displayName: data.displayName || '',
          description: data.description || '',
          specialization: data.specialization || '',
          clinicAddress: data.clinicAddress || '',
          clinicCity: data.clinicCity || '',
          historyOfWork: data.historyOfWork || '[]'
        }
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin bác sĩ:', error)
    }
  },
  methods: {
    addWork() {
      this.historyOfWork.push({
        yearStart: null,
        yearEnd: null,
        job: ''
      })
    },
    removeWork(index) {
      this.historyOfWork.splice(index, 1)
    },
    moveWorkUp(index) {
      if (index > 0) {
        const work = this.historyOfWork.splice(index, 1)[0]
        this.doctorInfo.historyOfWork.splice(index - 1, 0, work)
      }
    },
    moveWorkDown(index) {
      if (index < this.historyOfWork.length - 1) {
        const work = this.doctorInfo.historyOfWork.splice(index, 1)[0]
        this.doctorInfo.historyOfWork.splice(index + 1, 0, work)
      }
    },
    async updateDoctorInfo() {
      const userStore = useUserStore()
      try {
        this.doctorInfo.historyOfWork = JSON.stringify(this.historyOfWork)
        await axios.put('http://localhost:5217/api/Doctor/me', this.doctorInfo, {
          headers: { Authorization: `Bearer ${userStore.token}` }
        })
        message.success('Cập nhật hồ sơ thành công')
      } catch (error) {
        console.error('Lỗi khi cập nhật hồ sơ:', error)
        message.error('Không thể cập nhật hồ sơ')
      }
    }
  }
}
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
