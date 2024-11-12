<template>
  <div class="container my-4 d-flex justify-content-center">
    <div class="card shadow-sm w-100" style="max-width: 600px;">
      <div class="card-header bg-primary text-white">
        <h5 class="mb-0">Gửi báo cáo</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitReport">
          <div class="mb-3">
            <label for="reportDescription" class="form-label">Mô tả</label>
            <textarea
              id="reportDescription"
              v-model="reportDescription"
              class="form-control"
              placeholder="Nhập lý do báo cáo"
              rows="4"
              :class="{ 'is-invalid': error }"
            ></textarea>
            <div v-if="error" class="invalid-feedback">
              {{ error }}
            </div>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Gửi báo cáo
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/user';

export default {
  data() {
    return {
      reportDescription: '',
      loading: false,
      error: ''
    };
  },
  computed: {
    reportType() {
      return this.$route.query.type;
    },
    reportedId() {
      return this.$route.query.id;
    }
  },
  methods: {
    async submitReport() {
      if (!this.reportDescription.trim()) {
        this.error = 'Mô tả báo cáo không được để trống';
        return;
      }
      this.error = '';
      this.loading = true;
      
      const reportData = {
        reportType: this.reportType,
        reportDescription: this.reportDescription,
        reportedId: this.reportedId
      };

      try {
        const userStore = useUserStore();
        const token = userStore.token;

        await axios.post('http://localhost:5217/api/UserReport', reportData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.$message.success('Gửi báo cáo thành công');
        this.$router.push('/');
      } catch (error) {
        console.error('Lỗi khi gửi báo cáo:', error);
        this.$message.error('Gửi báo cáo thất bại. Vui lòng thử lại.');
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
</style>
