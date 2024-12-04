<template>
  <div class="news-management">
    <!-- Markdown Editor -->
    <div class="editor-section">
      <h2>Quản lí tin tức</h2>
      <a-input v-model:value="newsTitle" placeholder="Tiêu đề bài viết" class="mb-3" />
      <a-input v-model:value="newsAuthor" placeholder="Tác giả" class="mb-3" />
      <a-input v-model:value="newsCategory" placeholder="Loại" class="mb-3" />

      <div class="image-upload-section mb-3">
        <h3>Ảnh</h3>
        <a-input v-model:value="newsImageUrl" placeholder="Image URL" class="mb-2" disabled />
        <div>
          <input type="file" @change="handleFileSelect" />
          <a-button type="primary" @click="uploadImage" :loading="isUploading" class="ml-2">
            Đăng
          </a-button>
        </div>
      </div>

      <MdEditor
        v-model:model-value="newsContent"
        height="300px"
        language="en-US"
        code-theme="github"
      />

      <div class="actions mt-3">
        <a-button type="primary" @click="saveNews" :loading="isSaving">
          {{ newsToEditId ? 'Cập nhật' : 'Lưu' }}
        </a-button>
        <a-button type="default" @click="resetForm" class="ml-2"> Reset </a-button>
        <a-button v-if="newsToEditId" type="default" @click="cancelEdit" class="ml-2">
          Hủy chỉnh sửa
        </a-button>
      </div>
    </div>

    <!-- Existing News List -->
    <div class="news-list mt-5">
      <h2>Danh sách tin tức</h2>
      <a-list bordered :data-source="newsList" :loading="isLoading" item-layout="horizontal">
        <template v-for="item in newsList" :key="item.id">
          <a-list-item>
            <a-list-item-meta
              :title="item.title"
              :description="`Tác giả: ${item.author} | Loại: ${item.category}`"
            />
            <template #actions>
              <a-button type="link" @click="editNews(item)"> Chỉnh sửa </a-button>
              <a-button type="link" @click="confirmDelete(item.id)"> Xóa </a-button>
            </template>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { MdEditor } from 'md-editor-v3'
import { Input, Button, List, message } from 'ant-design-vue'
import 'md-editor-v3/lib/style.css'
const API_URL = import.meta.env.VITE_API_URL_DOTNET

export default {
  components: {
    MdEditor,
    AInput: Input,
    AButton: Button,
    AList: List
  },
  data() {
    return {
      // Form fields
      newsTitle: '',
      newsAuthor: '',
      newsContent: '',
      newsCategory: '',
      newsImageUrl: '',
      selectedFile: null,
      newsList: [],

      // States
      isLoading: false,
      isSaving: false,
      isUploading: false,
      newsToEditId: null
    }
  },
  methods: {
    // Fetch news list
    async fetchNews() {
      this.isLoading = true
      try {
        const response = await axios.get(`${API_URL}/api/News`)
        this.newsList = response.data
      } catch (error) {
        message.error('Error fetching news!')
      } finally {
        this.isLoading = false
      }
    },

    // Save or update news
    async saveNews() {
      if (!this.newsTitle || !this.newsAuthor || !this.newsContent || !this.newsCategory) {
        message.error('Vui lòng điền toàn bộ các thông tin!')
        return
      }

      this.isSaving = true
      try {
        const newsData = {
          title: this.newsTitle,
          author: this.newsAuthor,
          content: this.newsContent,
          category: this.newsCategory,
          imageUrl: this.newsImageUrl
        }

        if (this.newsToEditId) {
          // Update existing news
          await axios.put(`${API_URL}/api/News/${this.newsToEditId}`, newsData)
          message.success('News updated successfully!')
        } else {
          // Create new news
          await axios.post(`${API_URL}/api/News`, newsData)
          message.success('News saved successfully!')
        }

        this.fetchNews()
        this.resetForm()
      } catch (error) {
        message.error('Error saving news!')
      } finally {
        this.isSaving = false
      }
    },

    // Upload image
    async uploadImage() {
      if (!this.selectedFile) {
        message.error('Please select a file to upload!')
        return
      }

      this.isUploading = true
      const formData = new FormData()
      formData.append('Files', this.selectedFile)

      try {
        const response = await axios.post(`${API_URL}/api/Images`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        const imageId = response.data[0]?.id
        if (imageId) {
          this.newsImageUrl = `${API_URL}/api/Images/img/${imageId}`
          message.success('Image uploaded successfully!')
        } else {
          message.error('Error retrieving image ID!')
        }
      } catch (error) {
        message.error('Error uploading image!')
      } finally {
        this.isUploading = false
      }
    },

    // Handle file selection
    handleFileSelect(event) {
      this.selectedFile = event.target.files[0]
    },

    // Delete news
    async deleteNews(id) {
      try {
        await axios.delete(`${API_URL}/api/News/${id}`)
        message.success('News deleted successfully!')
        this.fetchNews()
      } catch (error) {
        message.error('Error deleting news!')
      }
    },

    // Edit news
    editNews(item) {
      this.newsToEditId = item.id
      this.newsTitle = item.title
      this.newsAuthor = item.author
      this.newsContent = item.content
      this.newsCategory = item.category
      this.newsImageUrl = item.imageUrl
    },

    // Reset form
    resetForm() {
      this.newsToEditId = null
      this.newsTitle = ''
      this.newsAuthor = ''
      this.newsContent = ''
      this.newsCategory = ''
      this.newsImageUrl = ''
      this.selectedFile = null
    },

    // Cancel editing
    cancelEdit() {
      this.resetForm()
      message.info('Đã hủy chỉnh sửa.')
    },

    confirmDelete(id) {
      this.$confirm({
        title: 'Bạn có chắc muốn xóa bài viết này?',
        content: 'Thao tác này không thể hoàn tác.',
        okText: 'Xóa',
        okType: 'danger',
        cancelText: 'Hủy',
        onOk: () => this.deleteNews(id),
        onCancel() {
        }
      })
    }
  },
  mounted() {
    this.fetchNews()
  }
}
</script>

<style scoped>
.news-management {
  padding: 20px;
}
.editor-section {
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
}
.actions {
  display: flex;
  justify-content: flex-end;
}
.news-list {
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
}
.image-upload-section input {
  margin-bottom: 8px;
}
</style>
