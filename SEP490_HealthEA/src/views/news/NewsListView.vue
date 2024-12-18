<template>
  <a-layout style="padding: 30px 50px">
    <a-layout-content
      :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '10px' }"
    >
      <div class="news-page row m-4">
        <!-- Left Side: Current Display -->
        <div class="left-half col-md-6 pr-4">
          <!-- Latest News -->
          <div class="latest-news card border-light mb-4">
            <div class="card-body">
              <h2>Tin Mới Nhất</h2>
              <div v-if="latestNews">
                <img
                  v-if="latestNews.imageUrl"
                  :src="latestNews.imageUrl"
                  alt="Latest News Image"
                  class="latest-news-image mb-3"
                />
                <h4>{{ latestNews.title }}</h4>
                <p class="text-muted">Tác giả: {{ latestNews.author }}</p>
                <p>{{ formatDate(latestNews.createdAt) }}</p>
                <router-link :to="`/news/${latestNews.id}`" class="btn btn-primary">
                  Đọc thêm
                </router-link>
              </div>
              <div v-else>Không có tin tức mới nhất.</div>
            </div>
          </div>

          <!-- All News -->
          <h2>Tất Cả Tin Tức</h2>
          <ul class="list-group mb-3">
            <template v-for="item in paginatedNews" :key="item.id">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{{ item.title }}</h5>
                  <small class="text-muted">Tác giả: {{ item.author }}</small>
                </div>
                <router-link :to="`/news/${item.id}`" class="btn btn-link"> Đọc thêm </router-link>
              </li>
            </template>
          </ul>
          <nav>
            <ul class="pagination">
              <li class="page-item" v-for="page in totalPages" :key="page">
                <button
                  class="page-link"
                  :class="{ active: currentPage === page }"
                  @click="handlePageChange(page)"
                >
                  {{ page }}
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Right Side: Random News -->
        <div class="right-half col-md-6 pl-4">
          <h2>Tin Nổi Bật</h2>
          <div v-if="isLoadingRandom" class="text-center">Đang tải...</div>
          <div v-else>
            <ul class="list-group">
              <template v-for="item in randomNews" :key="item.id">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{{ item.title }}</h5>
                    <small class="text-muted">Tác giả: {{ item.author }}</small>
                  </div>
                  <router-link :to="`/news/${item.id}`" class="btn btn-link">
                    Đọc thêm
                  </router-link>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL_DOTNET

export default {
  data() {
    return {
      newsList: [], // Full list of news
      latestNews: null, // The latest news item
      randomNews: [], // Random news items
      currentPage: 1, // Current page in pagination
      pageSize: 5, // Number of news items per page
      isLoading: false, // Loading state for main news
      isLoadingRandom: false, // Loading state for random news
      error: null // Error state
    }
  },
  computed: {
    paginatedNews() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      return this.newsList.slice(startIndex, startIndex + this.pageSize)
    },
    totalPages() {
      return Math.ceil(this.newsList.length / this.pageSize)
    }
  },
  methods: {
    async fetchNews() {
      this.isLoading = true
      try {
        const [allNews, latestNews] = await Promise.all([
          axios.get(`${API_URL}/api/News`),
          axios.get(`${API_URL}/api/News/latest`)
        ])
        this.newsList = allNews.data
        this.latestNews = latestNews.data
      } catch (err) {
        this.error = 'Không thể tải dữ liệu tin tức.'
      } finally {
        this.isLoading = false
      }
    },
    async fetchRandomNews() {
      this.isLoadingRandom = true
      try {
        const response = await axios.get(`${API_URL}/api/News/random?count=5`)
        this.randomNews = response.data
      } catch (err) {
        this.error = 'Không thể tải tin tức ngẫu nhiên.'
      } finally {
        this.isLoadingRandom = false
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(date).toLocaleDateString('vi-VN', options)
    },
    handlePageChange(page) {
      this.currentPage = page
    }
  },
  mounted() {
    this.fetchNews()
    this.fetchRandomNews()
  }
}
</script>

<style scoped>
.news-page {
  display: flex;
  flex-wrap: wrap;
}

.latest-news {
  background: #f9f9f9;
  border-radius: 8px;
}

.latest-news-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.pagination .page-item .page-link.active {
  background-color: #007bff;
  color: white;
}
</style>
