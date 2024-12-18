<template>
  <div class="news-page">
    <div v-if="isLoading" class="loading-spinner">
      <a-spin size="large" />
    </div>

    <div v-else>
      <h1 class="text-center font-bold">{{ news.title }}</h1>

      <!-- Banner Image -->
      <img v-if="news.imageUrl" :src="news.imageUrl" alt="News Banner" class="news-banner my-4" />

      <div class="d-flex justify-content-end mb-4">
        <div>
          <span class="fw-bold">{{ news.author }}</span>
          <div>Đăng tải: {{ formattedCreatedAt }}</div>
          <div v-if="formattedUpdatedAt">Cập nhật mới nhất: {{ formattedUpdatedAt }}</div>
          <div>
            <router-link class="btn btn-danger" :to="`/report?type=news&id=${$route.params.id}`">
              Báo cáo bài viết
            </router-link>
          </div>
        </div>
      </div>

      <div v-html="convertedContent" class="news-content"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { marked } from 'marked' // Import markdown parser
import { message } from 'ant-design-vue'
import { format } from 'date-fns' // For date formatting
const API_URL = import.meta.env.VITE_API_URL_DOTNET

export default {
  data() {
    return {
      news: {
        title: '',
        author: '',
        content: '',
        category: '',
        createdAt: '',
        updatedAt: ''
      },
      isLoading: true,
      convertedContent: ''
    }
  },
  computed: {
    // Format the created and updated date using date-fns
    formattedCreatedAt() {
      return this.news.createdAt ? format(new Date(this.news.createdAt), 'yyyy-MM-dd HH:mm:ss') : ''
    },
    formattedUpdatedAt() {
      return this.news.updatedAt ? format(new Date(this.news.updatedAt), 'yyyy-MM-dd HH:mm:ss') : ''
    }
  },
  mounted() {
    this.fetchNews()
  },
  methods: {
    async fetchNews() {
      const id = this.$route.params.id // Get the Guid from route params
      this.isLoading = true

      try {
        const response = await axios.get(`${API_URL}/api/News/${id}`)
        this.news = response.data
        this.convertedContent = marked(response.data.content) // Convert Markdown content to HTML
      } catch (error) {
        message.error('Error fetching the news!')
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.news-page {
  padding: 20px;
}

.news-banner {
  width: 100%; /* Full width */
  height: 300px; /* Restrict height */
  object-fit: cover; /* Maintain aspect ratio and crop */
  border-radius: 8px; /* Optional: Rounded corners */
  border: 1px solid #ddd; /* Optional: Border styling */
}

.news-content {
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-top: 20px;
}
</style>
