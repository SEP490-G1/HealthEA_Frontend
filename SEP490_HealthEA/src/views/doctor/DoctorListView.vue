<template>
  <a-layout style="padding: 30px 50px">
    <a-layout-content
      :style="{ background: '#fff', padding: '35px', margin: 0, minHeight: '10px' }"
    >
      <div class="doctor-list-container">
        <!-- Banner Section -->

        <!-- Search Header -->
        <div style="margin-bottom: 30px">
          <a-typography-title :level="2">Danh sách bác sĩ</a-typography-title>
        </div>

        <!-- Centered Search Filters -->
        <div>
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
              <a-select
                ref="select"
                v-model:value="filters.specialization"
                style="width: 300px"
                :options="options"
                size="large"
              ></a-select>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="fetchDoctors" size="large"> Tìm kiếm </a-button>
            </a-form-item>
            <router-link v-if="isDoctor" to="/doctors/me">Thông tin của bạn</router-link>
          </a-form>
        </div>

        <!-- Display number of results found -->
        <p class="results-count mt-4" v-if="doctors.length > 0">
          Tìm thấy <strong>{{ doctors.length }}</strong> kết quả
        </p>

        <!-- Doctor Cards Section -->
        <div class="doctor-cards mt-3">
          <a-row gutter="16" v-if="displayedDoctors.length > 0">
            <a-col v-for="doctor in displayedDoctors" :key="doctor.id" :xs="24" :sm="12" :md="6">
              <router-link :to="`/listDoctor/${doctor.id}`">
                <a-card class="doctor-card" hoverable>
                  <div class="profile-image-container">
                    <img
                      :src="doctor?.user?.avatar || 'https://via.placeholder.com/100'"
                      alt="Hình ảnh"
                      class="profile-image"
                    />
                  </div>
                  <div class="doctor-info">
                    <h3>{{ doctor.displayName }}</h3>
                    <p class="doctor-details">
                      <strong>Chuyên khoa:</strong> {{ doctor.specialization }}
                    </p>
                    <p class="doctor-details">
                      <strong>Thành phố:</strong> {{ doctor.clinicCity }}
                    </p>
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
    </a-layout-content>
  </a-layout>
</template>

<script>
import axios from 'axios'
import { useUserStore } from '@/stores/user'
const API_URL = import.meta.env.VITE_API_URL_DOTNET

export default {
  data() {
    return {
      filters: {
        name: '',
        city: '',
        specialization: ''
      },
      doctors: [],
      displayedDoctors: [],
      loading: false,
      currentPage: 1,
      pageSize: 8,
      isDoctor: false,
      options: [
        {
          value: '',
          label: '--Chọn chuyên khoa--'
        }
      ]
    }
  },
  methods: {
    async fetchDoctors() {
      this.loading = true
      const userStore = useUserStore()
      try {
        const response = await axios.get(`${API_URL}/api/Doctor`, {
          params: {
            name: this.filters.name,
            city: this.filters.city,
            specialization: this.filters.specialization
          },
          headers: { Authorization: `Bearer ${userStore.token}` }
        })
        this.doctors = response.data
        this.updateDisplayedDoctors()
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bác sĩ:', error)
      } finally {
        this.loading = false
      }
    },
    updateDisplayedDoctors() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      this.displayedDoctors = this.doctors.slice(startIndex, startIndex + this.pageSize)
    },
    handlePageChange(page) {
      this.currentPage = page
      this.updateDisplayedDoctors()
    },
    async checkUserIsDoctor() {
      const userStore = useUserStore()
      try {
        const response = await axios.get(`${API_URL}/api/Doctor/me`, {
          headers: { Authorization: `Bearer ${userStore.token}` }
        })
        this.isDoctor = true
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    async getSpecializations() {
      const userStore = useUserStore()
      try {
        const response = await axios.get(`${API_URL}/api/Doctor/specializations`, {
          headers: { Authorization: `Bearer ${userStore.token}` }
        })
        const data = response.data
        const formattedOptions = data.map((item) => ({
          value: item,
          label: item
        }))
        this.options = [
          {
            value: '',
            label: '--Chọn chuyên khoa--'
          },
          ...formattedOptions
        ]
      } catch (error) {
        console.error('Lỗi khi lấy danh sách chuyên khoa:', error)
      } finally {
        this.loading = false
      }
    }
  },
  watch: {
    doctors() {
      this.currentPage = 1
      this.updateDisplayedDoctors()
    }
  },
  created() {
    this.fetchDoctors()
    this.getSpecializations()
    this.checkUserIsDoctor()
  }
}
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
