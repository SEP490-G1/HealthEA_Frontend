<template>
    <div class="container mt-4">
      <h2>Quản lí báo cáo</h2>
  
      <!-- Filter by Status -->
      <a-select
        v-model:value="statusFilter"
        @change="fetchReports"
        class="mb-3"
        placeholder="Lọc theo Trạng thái"
        style="width: 200px"
      >
        <a-select-option :value="null">Tất cả</a-select-option>
        <a-select-option :value="0">Chưa giải quyết</a-select-option>
        <a-select-option :value="1">Đã giải quyết</a-select-option>
      </a-select>
  
      <!-- Report Table -->
      <a-table
        :columns="columns"
        :dataSource="reports"
        rowKey="id"
        :loading="loading"
        bordered
        style="width: 100%; height: 400px;"
      >
        <template v-slot:status="{ text }">
          <span :class="text === 1 ? 'text-success' : 'text-danger'">
            {{ text === 1 ? 'Đã giải quyết' : 'Chưa giải quyết' }}
          </span>
        </template>
        <template v-slot:id="{ text }">
          <router-link :to="`/admin/reports/${text}`">{{ text }}</router-link>
        </template>
        <template v-slot:createdAt="{ text }">
          {{ formatDate(text) }}
        </template>
        <template v-slot:resolvedAt="{ text }">
          {{ text ? formatDate(text) : 'Chưa có' }}
        </template>
      </a-table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { format } from 'date-fns';
  const API_URL = import.meta.env.VITE_API_URL_DOTNET
  
  export default {
    data() {
      return {
        reports: [],
        statusFilter: null,
        loading: false,
        columns: [
          { title: 'ID', dataIndex: 'id', key: 'id', slots: { customRender: 'id' }},
          { title: 'Loại', dataIndex: 'reportType', key: 'reportType' },
          { title: 'ID người báo cáo', dataIndex: 'reporterId', key: 'reporterId' },
          { title: 'Trạng thái', dataIndex: 'status', key: 'status', slots: { customRender: 'status' }},
          { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt', slots: { customRender: 'createdAt' }},
          { title: 'Ngày giải quyết', dataIndex: 'resolvedAt', key: 'resolvedAt', slots: { customRender: 'resolvedAt' }}
        ]
      };
    },
    methods: {
      async fetchReports() {
        this.loading = true;
        try {
          const response = await axios.get(`${API_URL}/api/UserReport`, { params: { status: this.statusFilter } });
          this.reports = response.data;
        } catch (error) {
          console.error("Lỗi khi lấy báo cáo", error);
        } finally {
          this.loading = false;
        }
      },
      formatDate(date) {
        return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
      }
    },
    mounted() {
      this.fetchReports();
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
  