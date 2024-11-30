<template>
  <div class="container mt-4">
    <h2>Chi tiết Báo cáo</h2>

    <div v-if="report">
      <div class="text-wrap alert alert-info mt-3">
        <div><strong>Mô tả:</strong> </div>
        <span class="report-description">{{ report.reportDescription }}</span>
      </div>

      <div v-if="report.reported" class="card mb-3 p-3">
        <p><strong>Đối tượng báo cáo:</strong> {{ report.reported.name }}</p>
        <p><strong>ID:</strong> {{ report.reportedId }}</p>
        <a-button
          v-if="redirectLink"
          type="primary"
          @click="goToTargetPage"
        >
          Xem chi tiết
        </a-button>
      </div>
      <div v-else class="card mb-3 p-3 text-danger">
        Đối tượng báo cáo không tồn tại trong cơ sở dữ liệu.
      </div>

      <p><strong>Trạng thái:</strong>
        <span :class="report.status === 1 ? 'text-success' : 'text-danger'">
          {{ report.status === 1 ? 'Đã giải quyết' : 'Chưa giải quyết' }}
        </span>
      </p>
      <p><strong>Ngày tạo:</strong> {{ formatDate(report.createdAt) }}</p>
      <p><strong>Ngày giải quyết:</strong> {{ report.resolvedAt ? formatDate(report.resolvedAt) : 'Chưa có' }}</p>

      <a-button @click="showConfirm" type="primary">
        Đánh dấu là {{ report.status === 1 ? 'Chưa giải quyết' : 'Đã giải quyết' }}
      </a-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { format } from 'date-fns';
import { Modal } from 'ant-design-vue';
import { useUserStore } from '@/stores/user';
const API_URL = import.meta.env.VITE_API_URL_DOTNET

export default {
  data() {
    return {
      report: null,
      linkMapping: {
        doctor: "/doctors/",
        patient: "/patients/",
        // Add more mappings as needed
      }
    };
  },
  computed: {
    redirectLink() {
      const typeLink = this.linkMapping[this.report.reportType];
      return typeLink ? `${typeLink}${this.report.reportedId}` : null;
    }
  },
  methods: {
    async fetchReport() {
      const id = this.$route.params.id;
      const userStore = useUserStore();
      try {
        const response = await axios.get(`${API_URL}/api/UserReport/${id}`, {
          headers: { Authorization: `Bearer ${userStore.token}` },
        });
        this.report = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết báo cáo", error);
        this.$router.push("/error/404")
      }
    },
    formatDate(date) {
      return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
    },
    async toggleStatus() {
      const newStatus = this.report.status === 1 ? 0 : 1;
      try {
        await axios.patch(`${API_URL}/api/UserReport/${this.report.id}/status`, { status: newStatus });
        this.report.status = newStatus;
        this.report.resolvedAt = newStatus === 1 ? new Date() : null;
      } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái báo cáo", error);
      }
    },
    showConfirm() {
      const action = this.report.status === 1 ? 'đánh dấu là chưa giải quyết' : 'đánh dấu là đã giải quyết';
      Modal.confirm({
        title: 'Bạn có chắc không?',
        content: `Bạn có chắc muốn ${action} báo cáo này không?`,
        onOk: () => this.toggleStatus(),
        onCancel: () => console.log('Thay đổi trạng thái bị hủy'),
      });
    },
    goToTargetPage() {
      if (this.redirectLink) {
        this.$router.push(this.redirectLink);
      }
    }
  },
  mounted() {
    this.fetchReport();
  }
};
</script>

<style scoped>
.report-description {
  white-space: pre-wrap;
  font-size: 1.1rem;
}

.text-success {
  color: green;
}

.text-danger {
  color: red;
}

.card {
  border: 1px solid #e0e0e0;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
