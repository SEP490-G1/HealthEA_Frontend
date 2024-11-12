<template>
  <div class="doctor-list-container">
    <!-- Banner Section -->
    <div class="banner bg-primary text-white text-center py-4">
      <h1>Chào mừng đến với Dịch vụ Bác sĩ</h1>
      <p>Chúng tôi giúp bạn tìm bác sĩ phù hợp nhất cho nhu cầu của bạn</p>
    </div>

    <!-- Search Filters -->
    <a-form layout="inline" @submit.prevent="fetchDoctors" class="search-form mt-4">
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

    <!-- Doctor Cards Section -->
    <div class="doctor-cards mt-5">
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
                <p><strong>Chuyên khoa:</strong> {{ doctor.specialization }}</p>
                <p><strong>Thành phố:</strong> {{ doctor.clinicCity }}</p>
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
      try {
        const response = await axios.get('http://localhost:5217/api/Doctor', {
          params: {
            name: this.filters.name,
            city: this.filters.city
          }
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
  background-image: url('https://via.placeholder.com/1200x300');
  background-size: cover;
  background-position: center;
}

.banner h1 {
  font-size: 3rem;
  font-weight: bold;
}

.banner p {
  font-size: 1.2rem;
  font-weight: 400;
}

/* Doctor List Container */
.doctor-list-container {
  padding: 16px;
}

/* Search Form Styling */
.search-form .a-form-item {
  margin-right: 16px;
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
  font-size: 18px;
  font-weight: bold;
}

.doctor-info p {
  margin: 4px 0;
  font-size: 14px;
  color: #555;
}

/* Pagination Section */
.pagination {
  text-align: center;
  margin-top: 16px;
}

/* Loading Spinner */
.spinner-border {
  margin-right: 8px;
}
</style>
