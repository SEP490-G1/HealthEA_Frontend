<template>
  <div class="news-page">
    <div v-if="isLoading" class="loading-spinner">
      <a-spin size="large" />
    </div>

    <div v-else>
      <h1 class="text-center font-bold">{{ news.title }}</h1>
      <div class="d-flex justify-content-end mb-4">

        <div>
          <span class="fw-bold">{{ news.author }}</span>
          <div>Created: {{ formattedCreatedAt }}</div>
          <div>Updated: {{ formattedUpdatedAt }}</div>
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
        const response = await axios.get(`http://localhost:5217/api/News/${id}`)
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
.news-content {
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-top: 20px;
}
</style>
