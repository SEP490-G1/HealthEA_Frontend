<template>
  <div class="upload-container">
    <a-upload
      v-model:file-list="fileList"
      list-type="picture-card"
      beforeUpload="beforeUpload"
      @preview="handlePreview"
    >
      <div v-if="fileList.length < 1">
        <plus-outlined />
        <div style="margin-top: 8px">Upload</div>
      </div>
    </a-upload>
    <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>

    <a-button
      type="primary"
      class="submit-button"
      :loading="loading"
      :disabled="loading"
      @click="handleSubmit"
    >
      Upload ảnh
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { PlusOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import type { UploadProps } from 'ant-design-vue'
import axios from 'axios'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'



function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const previewVisible = ref(false)
const previewImage = ref('')
const previewTitle = ref('')
const loading = ref(false) // Track whether the upload is in progress
const fileList = ref<UploadProps['fileList']>([])

const handleCancel = () => {
  previewVisible.value = false
  previewTitle.value = ''
}

const handlePreview = async (file: UploadProps['fileList'][number]) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string
  }
  previewImage.value = file.url || file.preview
  previewVisible.value = true
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
}

const handleSubmit = async () => {
  if (fileList.value.length === 0) {
    message.warning('Please upload at least one image!')
    return
  }

  const formData = new FormData()

  // Append each file to the FormData object
  fileList.value.forEach((file) => {
    if (file.originFileObj) {
      formData.append('files', file.originFileObj) // 'files' is the key your server expects
    }
  })

  // Set loading to true to disable the button and show loading indicator
  loading.value = true
  const uploadMessage = message.loading('Uploading images...', 0)

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL_DOTNET}/api/Images`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    uploadMessage() // Hide the loading message
    message.success('Upload successful!')
    console.log('Upload successful:', response.data.imageUrl)

  } catch (error) {
    uploadMessage() // Hide the loading message
    message.error('Upload failed. Please try again.')
    console.error('Upload failed:', error)
  } finally {
    // Set loading back to false after the request is complete
    loading.value = false
  }
}

const beforeUpload = () => false


</script>

<style scoped>
.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  margin-top: 50px;
}

.upload-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.submit-button {
  margin-top: 20px;
}
</style>
