<template>
    <div class="form-container">
      <h2>Enter Your Information</h2>
  
      <label for="height">Height (cm):</label>
      <input v-model="form.height" type="number" id="height" placeholder="Enter height" />
  
      <label for="weight">Weight (kg):</label>
      <input v-model="form.weight" type="number" id="weight" placeholder="Enter weight" />
  
      <label for="bloodPressure">Blood Pressure:</label>
      <input v-model="form.bloodPressure" type="text" id="bloodPressure" placeholder="Enter blood pressure" />
  
      <a-button type="primary" class="submit-button">Submit</a-button>
  
      <a-button type="default" class="upload-panel-button" @click="showUploadPanel = true">
        Upload Image for Auto-Fill
      </a-button>
  
      <!-- Image Upload Panel -->
      <a-modal v-model:open="showUploadPanel" title="Upload an Image" :footer="null" @cancel="handleCancel">
        <a-upload
          v-model:file-list="fileList"
          list-type="picture-card"
          beforeUpload="beforeUpload"
          @preview="handlePreview"
        >
          <div v-if="fileList.length < 1">
            <plus-outlined />
            <div style="margin-top: 8px">Upload Image</div>
          </div>
        </a-upload>
  
        <a-button type="primary" class="upload-button" :loading="loading" @click="handleUpload">
          Upload and Scan
        </a-button>
      </a-modal>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import { message } from 'ant-design-vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  
  // Form values for height, weight, blood pressure
  const form = ref({
    height: 0,
    weight: 0,
    bloodPressure: ''
  })
  
  const showUploadPanel = ref(false) // Controls modal visibility
  const loading = ref(false) // Loading state during upload
  const fileList = ref([]) // File list for upload
  
  const handleCancel = () => {
    showUploadPanel.value = false
  }
  
  const handleUpload = async () => {
    if (fileList.value.length === 0) {
      message.warning('Please upload an image!')
      return
    }
  
    const formData = new FormData()
    const file = fileList.value[0].originFileObj // Only one image allowed
  
    formData.append('file', file)
  
    loading.value = true // Start loading
    try {
      const response = await axios.post('http://localhost:5217/api/Images/scan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  
      // Assume API returns the structure { weight: 0, height: 0, bloodPressure: 0 }
      const data = response.data
      form.value.height = data.height
      form.value.weight = data.weight
      form.value.bloodPressure = data.bloodPressure
  
      message.success('Image processed successfully!')
      showUploadPanel.value = false // Close the panel
    } catch (error) {
      message.error('Failed to process the image.')
      console.error(error)
    } finally {
      loading.value = false // Stop loading
    }
  }
  
  const beforeUpload = () => false
  
  const handlePreview = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file.originFileObj)
    reader.onload = () => {
      // You can preview the image or handle it as needed
    }
  }
  </script>
  
  <style scoped>
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  label {
    margin-top: 10px;
    font-weight: bold;
  }
  
  input {
    margin-bottom: 15px;
    padding: 8px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .submit-button,
  .upload-panel-button {
    margin-top: 10px;
  }
  
  .upload-button {
    margin-top: 20px;
  }
  </style>
  