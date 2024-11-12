<template>
    <div class="container mt-4">
      <h2>Chi tiết Báo cáo</h2>
  
      <div v-if="report">
        <p><strong>Loại:</strong> {{ report.reportType }}</p>
        <p><strong>Mô tả:</strong> {{ report.reportDescription }}</p>
        <p><strong>ID người báo cáo:</strong> {{ report.reporterId }}</p>
        <p><strong>ID mục tiêu bị báo cáo:</strong> {{ report.reportedId }}</p>
        <p><strong>Trạng thái:</strong>
          <span :class="report.status === 1 ? 'text-success' : 'text-danger'">
            {{ report.status === 1 ? 'Đã giải quyết' : 'Chưa giải quyết' }}
          </span>
        </p>
        <p><strong>Ngày tạo:</strong> {{ formatDate(report.createdAt) }}</p>
        <p><strong>Ngày giải quyết:</strong> {{ report.resolvedAt ? formatDate(report.resolvedAt) : 'Chưa có' }}</p>
  
        <button @click="showConfirm" class="btn btn-primary">
          Đánh dấu là {{ report.status === 1 ? 'Chưa giải quyết' : 'Đã giải quyết' }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { format } from 'date-fns';
  import { Modal } from 'ant-design-vue';
  
  export default {
    data() {
      return {
        report: null,
      };
    },
    methods: {
      async fetchReport() {
        const id = this.$route.params.id;
        try {
          const response = await axios.get(`http://localhost:5217/api/UserReport/${id}`);
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
          await axios.patch(`http://localhost:5217/api/UserReport/${this.report.id}/status`, { status: newStatus });
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
      }
    },
    mounted() {
      this.fetchReport();
    }
  };
  </script>
  
  <style scoped>
  .text-success {
    color: green;
  }
  .text-danger {
    color: red;
  }
  </style>
  