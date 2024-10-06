<template>
    <div class="upload-container">
      <h2 class="upload-title">Upload Your Images</h2>
      <a-upload
        v-model:file-list="fileList"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        list-type="picture-card"
        @preview="handlePreview"
      >
        <div v-if="fileList.length < 8">
          <plus-outlined />
          <div style="margin-top: 8px">Upload</div>
        </div>
      </a-upload>
      <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
  
      <a-button type="primary" class="submit-button" @click="handleSubmit">Submit</a-button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';
  import type { UploadProps } from 'ant-design-vue';
  
  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
  const previewVisible = ref(false);
  const previewImage = ref('');
  const previewTitle = ref('');
  
  const fileList = ref<UploadProps['fileList']>([]);
  
  const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = '';
  };
  
  const handlePreview = async (file: UploadProps['fileList'][number]) => {
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file.originFileObj)) as string;
    }
    previewImage.value = file.url || file.preview;
    previewVisible.value = true;
    previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
  };
  
  const handleSubmit = () => {
    //TODO add logic
  };
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
  