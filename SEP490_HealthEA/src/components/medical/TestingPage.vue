<script setup>
import { useMedicalRecordStore } from '@/stores/medicalRecord'
</script>
<template>
  <div>
    <a-typography-title :level="2" style="margin-top: 30px"
      >Danh sách xét nghiệm</a-typography-title
    >
    <a-dropdown :trigger="['click']">
      <template #overlay>
        <a-menu>
          <a-menu-item @click="addNew" key="1"> Thêm một tài liệu trống </a-menu-item>
          <a-menu-item @click="scanImage" key="2"> Scan ảnh của bạn </a-menu-item>
        </a-menu>
      </template>
      <a-button>
        Thêm mới
        <DownOutlined />
      </a-button>
    </a-dropdown>
    <div>
      <a-list item-layout="horizontal" :data-source="listPre">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta :description="item.lastModified">
              <template #title>
                <a @click="jump(item.id)">{{ item.title }}</a>
              </template>
              <!-- <template #avatar>
                <a @click="jump(item.id)">{{ item.title }}</a>
              </template> -->
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
    <a-drawer
      v-model:open="open"
      class="custom-class"
      root-class-name="root-class-name"
      :root-style="{ color: 'blue' }"
      style="color: red"
      title="Scan ảnh với AI"
      placement="right"
    >
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
        Tạo với ảnh này ngay
      </a-button>
    </a-drawer>
  </div>
</template>
<script>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { DownOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import axios from 'axios'

export default {
  async mounted() {
    this.loadData()
  },
  methods: {
    async handleSubmit() {
      if (this.fileList.length === 0) {
        message.warning('Please upload at least one image!')
        return
      }
      const formData1 = new FormData()
      const formData2 = new FormData()

      // Append each file to the FormData object
      this.fileList.forEach((file) => {
        if (file.originFileObj) {
          formData1.append('File', file.originFileObj)
          formData2.append('Files', file.originFileObj)
        }
      })

      // Set loading to true to disable the button and show loading indicator
      this.loading = true
      const uploadMessage1 = message.loading('Uploading images...', 0)
      const uploadMessage2 = message.loading('Scan images...', 0)
      var obj = {
        image: [],
        type: 3,
        healthProfileId: this.idHP,
        contentMedical: '{}'
      }
      try {
        const response = await axios.post('http://localhost:5217/api/Scan/urinalyst', formData1, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].key = i + 1
        }
        console.log(response.data);
        
        var object = {
          date: dayjs(),
          doctor: '',
          image: [],
          title: 'Xét nghiệm scan từ ảnh',
          drug: response.data
        }
        obj.contentMedical = JSON.stringify(object)
        uploadMessage1()
        message.success('Scan successful!')
      } catch (error) {
        uploadMessage1() // Hide the loading message
        message.error('Scan failed. Please try again.')
        console.error('Scan failed:', error)
        return
      }
      try {
        const objUpload = await axios.post('http://localhost:5217/api/Images', formData2, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        uploadMessage2()
        obj.image = [`${objUpload.data[0].id}`]
        console.log('Res IMGAE', obj.image)
        message.success('Upload successful!')
      } catch (err) {
        uploadMessage2() // Hide the loading message
        message.error('Upload failed. Please try again.')
        console.error('Upload failed:', err)
        return
      }
      try {
        const res = useMedicalRecordStore()
        var responsez = await res.addNewDP(obj)
        this.jump(responsez.data.data.id)
      } catch (err) {
        console.log(err)
        message.error('Lỗi khi save vào hệ thống', 10)
      }
    },

    showDrawer() {
      this.open = !this.open
    },
    async scanImage() {
      this.showDrawer()
    },
    async addNew() {
      var obj = {
        image: [],
        type: 3,
        healthProfileId: this.idHP,
        contentMedical: '{}'
      }
      const res = useMedicalRecordStore()
      var response = await res.addNewDP(obj)

      console.log(response)

      this.jump(response.data.data.id)
    },

    jump(id) {
      this.$router.push(`/profileHealth/medical_record/testing/${this.idHP}/detail/${id}`)
    },
    getTitle(value) {
      var obj = JSON.parse(value.contentMedical)
      if (undefined == obj.title) {
        return `Xét nghiệm của ngày ${dayjs(obj.date).format('DD-MM-YYYY')}`
      }
      return obj.title
    },
    async loadData() {
      const res = useMedicalRecordStore()
      var listnew = []
      var list = await res.getListAType(this.idHP, 3)
      list.data.data.forEach((element) => {
        listnew.push({
          id: element.id,
          date: dayjs(element.createDate).format('YYYY-MM-DD'),
          title: this.getTitle(element),
          lastModified: `Lần thay đổi cuối  ${dayjs(element.lastModifyDate).format('YYYY-MM-DD, HH:mm:ss')}`
        })
      })
      listnew.sort((a, b) => -(new Date(a.date) - new Date(b.date)))
      this.listPre = listnew
    }
  },
  data() {
    return {
      loading: ref(false),
      fileList: ref([]),
      open: ref(false),
      listPre: ref([]),
      idHP: this.$route.params.id
    }
  }
}
</script>
<style scoped></style>
