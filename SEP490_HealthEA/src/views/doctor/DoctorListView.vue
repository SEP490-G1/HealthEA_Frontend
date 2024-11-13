<template>
  <div class="doctor-list-container">
    <!-- Banner Section -->
    <div class="banner text-white text-center py-4">
      <h1>Chào mừng đến với Dịch vụ Bác sĩ</h1>
      <p>Chúng tôi giúp bạn tìm bác sĩ phù hợp nhất cho nhu cầu của bạn</p>
    </div>

    <!-- Search Header -->
    <div class="search-header text-center mt-4">
      <h2>Tìm kiếm bác sĩ</h2>
      <p>Điền thông tin dưới đây để tìm bác sĩ bạn cần</p>
    </div>

    <!-- Centered Search Filters -->
    <div class="search-container mt-3">
      <a-form layout="inline" @submit.prevent="fetchDoctors" class="search-form">
        <a-form-item>
          <a-input
            v-model:value="filters.name"
            placeholder="Tìm theo tên bác sĩ"
            allow-clear
            size="large"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            v-model:value="filters.city"
            placeholder="Tìm theo thành phố"
            allow-clear
            size="large"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            @click="fetchDoctors"
            size="large"
          >
            Tìm kiếm
          </a-button>
        </a-form-item>
      </a-form>
    </div>

    <!-- Display number of results found -->
    <p class="results-count mt-4" v-if="doctors.length > 0">Found {{ doctors.length }} results</p>

    <!-- Doctor Cards Section -->
    <div class="doctor-cards mt-3">
      <a-row gutter="16" v-if="displayedDoctors.length > 0">
        <a-col
          v-for="doctor in displayedDoctors"
          :key="doctor.id"
          :xs="24"
          :sm="12"
          :md="6"
        >
          <router-link :to="`/doctors/${doctor.id}`">
            <a-card class="doctor-card" hoverable>
              <div class="profile-image-container">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Hình ảnh"
                  class="profile-image"
                />
              </div>
              <div class="doctor-info">
                <h3>{{ doctor.displayName }}</h3>
                <p class="doctor-details"><strong>Chuyên khoa:</strong> {{ doctor.specialization }}</p>
                <p class="doctor-details"><strong>Thành phố:</strong> {{ doctor.clinicCity }}</p>
              </div>
            </a-card>
          </router-link>
        </a-col>
      </a-row>
      <p v-else>Không tìm thấy bác sĩ nào</p>
    </div>

    <!-- Pagination Section -->
    <a-pagination
      v-if="doctors.length > pageSize"
      :total="doctors.length"
      :page-size="pageSize"
      :current="currentPage"
      @change="handlePageChange"
      class="pagination"
    />
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/user';

export default {
  data() {
    return {
      filters: {
        name: '',
        city: ''
      },
      doctors: [],
      displayedDoctors: [],
      loading: false,
      currentPage: 1,
      pageSize: 8
    };
  },
  methods: {
    async fetchDoctors() {
      this.loading = true;
      const userStore = useUserStore();
      try {
        const response = await axios.get('http://localhost:5217/api/Doctor', {
          params: {
            name: this.filters.name,
            city: this.filters.city
          },
          headers: { Authorization: `Bearer ${userStore.token}` }
        });
        this.doctors = response.data;
        this.updateDisplayedDoctors();
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bác sĩ:', error);
      } finally {
        this.loading = false;
      }
    },
    updateDisplayedDoctors() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      this.displayedDoctors = this.doctors.slice(startIndex, startIndex + this.pageSize);
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.updateDisplayedDoctors();
    }
  },
  watch: {
    doctors() {
      this.currentPage = 1;
      this.updateDisplayedDoctors();
    }
  },
  created() {
    this.fetchDoctors();
  }
};
</script>

<style scoped>
/* Banner Section */
.banner {
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  padding: 50px 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.banner h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

.banner p {
  font-size: 1.2rem;
  font-weight: 400;
}

/* Search Header */
.search-header h2 {
  font-size: 1.8rem;
  font-weight: bold;
}

.search-header p {
  font-size: 1rem;
  color: #555;
}

/* Doctor List Container */
.doctor-list-container {
  padding: 16px;
}

/* Centered Search Form */
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f4ff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.search-form .a-form-item {
  margin-right: 16px;
}

/* Results Count Text */
.results-count {
  color: #555;
  font-size: 1rem;
  font-weight: 500;
}

/* Doctor Cards Styling */
.doctor-cards {
  margin-top: 16px;
}

.doctor-card {
  text-align: center;
  margin-bottom: 16px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;
}

.doctor-card:hover {
  transform: scale(1.05);
}

.profile-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.doctor-info h3 {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}

.doctor-details {
  font-size: 16px;
  color: #555;
}

/* Pagination Section */
.pagination {
  text-align: center;
  margin-top: 16px;
}
</style>
