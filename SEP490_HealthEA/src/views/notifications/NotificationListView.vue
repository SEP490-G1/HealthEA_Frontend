<template>
  <div class="m-5">
    <div class="mb-3">
      <h3>Thông báo</h3>
      <button @click="handleReadAll()" class="btn btn-primary">Đánh dấu tất cả là đã đọc</button>
    </div>
    <div v-if="isLoading" class="d-flex justify-content-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <ul class="list-group">
      <li
        v-for="notification in notifications"
        :key="notification.noticeId"
        class="list-group-item d-flex flex-column align-items-start"
      >
        <div class="d-flex w-100 justify-content-between">
          <h6 class="mb-1">
            Từ: <strong>{{ notification.senderName }}</strong
            >&nbsp;<span v-if="!notification.hasViewed" class="badge bg-danger ml-1"> Mới! </span>
          </h6>
          <small class="text-muted">{{ formatDate(notification.createdAt) }}</small>
        </div>
        <p class="mb-2">{{ notification.message }}</p>
      </li>
    </ul>
    <nav class="mt-3">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: pageNumber === 1 }">
          <button class="page-link" @click="handlePageChange(pageNumber - 1)">Previous</button>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === pageNumber }"
        >
          <button class="page-link" @click="handlePageChange(page)">
            {{ page }}
          </button>
        </li>
        <li class="page-item" :class="{ disabled: pageNumber === totalPages }">
          <button class="page-link" @click="handlePageChange(pageNumber + 1)">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { message } from 'ant-design-vue'

export default {
  name: 'NotificationPage',
  setup() {
    const userStore = useUserStore()
    const notifications = ref([])
    const pageNumber = ref(1)
    const pageSize = 10
    const totalPages = ref(0)
    const isLoading = ref(false)

    const fetchNotifications = async () => {
      notifications.value = []
      isLoading.value = true
      try {
        const response = await axios.get(
          `http://localhost:5217/api/Notification?pageNumber=${pageNumber.value}&pageSize=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${userStore.token}`
            }
          }
        )
        notifications.value = response.data.items
        totalPages.value = response.data.totalPages
      } catch (error) {
        console.error('Failed to fetch notifications:', error)
      } finally {
        isLoading.value = false
      }
    }

    const handlePageChange = (newPage) => {
      if (newPage < 1 || newPage > totalPages.value) return
      pageNumber.value = newPage
      fetchNotifications()
    }

    const handleReadAll = async () => {
      try {
        const response = await axios.get(`http://localhost:5217/api/Notification/readAll`, {
          headers: {
            Authorization: `Bearer ${userStore.token}`
          }
        })
        message.success('Đánh dấu trạng thái thành công!')
        await fetchNotifications()
      } catch {
        console.error('Failed to update notifications', error)
      }
    }

    const formatDate = (dateString) => new Date(dateString).toLocaleString('en-US')

    onMounted(fetchNotifications)

    return {
      notifications,
      pageNumber,
      totalPages,
      isLoading,
      fetchNotifications,
      handlePageChange,
      handleReadAll,
      formatDate
    }
  }
}
</script>
