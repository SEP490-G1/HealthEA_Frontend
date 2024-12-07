<script setup>
import { useMedicalRecordStore } from '@/stores/medicalRecord'
</script>
<template>
  <div>
    <a-typography-title :level="2" style="margin-top: 30px"
      >Danh sách xét nghiệm</a-typography-title
    >
    <a-dropdown :trigger="['click']" v-if="editMode">
      <template #overlay>
        <a-menu>
          <a-menu-item @click="addNew" key="1"> Thêm một tài liệu trống </a-menu-item>
          <a-menu-item @click="addNew1" key="2"> Thêm xét nghiệm nước tiểu mẫu </a-menu-item>
          <a-menu-item @click="addNew2" key="3"> Thêm xét nghiệm máu mẫu </a-menu-item>
          <a-menu-item @click="scanImage" key="4"> Scan ảnh của bạn </a-menu-item>
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
        Quét kết quả xét nghiệm
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
import { useUserStore } from '@/stores/user'
const API_URL = import.meta.env.VITE_API_URL_DOTNET

export default {
  async mounted() {
    this.loadData()
  },
  methods: {
    getListFromVariable(variable) {
      if (Array.isArray(variable)) {
        // Nếu biến là một mảng, trả về mảng đó
        return variable
      } else if (typeof variable === 'object' && variable !== null) {
        const properties = Object.keys(variable)
        return variable[properties]
      }
      // Nếu không thuộc trường hợp nào trên, trả về null hoặc một giá trị mặc định khác
      return null
    },
    handleRefer(list) {
      list.forEach((element) => {
        let str = ''
        if (element.reference.type == 'range') {
          if (element.reference.max == null || element.reference.min == null) {
            if (element.reference.max == element.reference.min) {
              str = ''
            }
            if (element.reference.min == null) {
              str = ` < ${element.reference.max}`
            }
            if (element.reference.max == null) {
              str = ` > ${element.reference.max}`
            }
          } else {
            str = `${element.reference.min} - ${element.reference.max}`
          }
        }
        if (element.reference.type == 'value') {
          str = element.reference.value
        }
        element.reference = str
      })
      return list
    },
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
      const uploadMessage1 = message.loading('Scan images...', 0)
      var obj = {
        image: [],
        type: 3,
        healthProfileId: this.idHP,
        contentMedical: '{}'
      }
      try {
        const response = await axios.post(`${API_URL}/api/Scan/urinalyst`, formData1, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].key = i + 1
        }
        response.data = this.getListFromVariable(response.data)
        var object = {
          date: dayjs(),
          doctor: '',
          image: [],
          title: 'Xét nghiệm scan từ ảnh',
          drug: this.handleRefer(response.data)
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
      const uploadMessage2 = message.loading('Upload images...', 0)
      try {
        const objUpload = await axios.post(`${API_URL}/api/Images`, formData2, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        uploadMessage2()
        obj.image = [`${objUpload.data[0].id}`]
        message.success('Upload successful!')
      } catch (err) {
        uploadMessage2() // Hide the loading message
        message.error('Upload failed. Please try again.')
        console.error('Upload failed:', err)
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
    async addNew1() {
      var obj = {
        image: [],
        type: 3,
        healthProfileId: this.idHP,
        contentMedical:
          '{"title":"Xét nghiệm nước tiểu mẫu","date":"2024-12-01T13:38:37.133Z","doctorRecomend":"Thụy test lỗi","drug":[{"key":1,"name":"LEU (Leukocytes)","value":0,"result":"10 - 25","unit":"Leu/UL"},{"key":2,"name":"NIT (Nitrite)","value":0,"result":"0.05 - 0.1","unit":"mg/dL"},{"key":3,"name":"pH (độ pH)","value":0,"result":"6,7-7.0","unit":"pH"},{"key":4,"name":"GLU (Glucose - đường huyết)","value":0,"result":"50-100","unit":"mg/dL"},{"key":5,"name":"BLD (hồng cầu)","value":0,"result":"4,6 - 8","unit":"pH"},{"key":6,"name":"PRO (Protein)","value":0,"result":"7.5 - 20/Âm tính","unit":"mg/dL"},{"key":7,"name":"KET (Ketone)","value":0,"result":"2,5 - 5/ âm tính","unit":"mg/dL"},{"key":8,"name":"ASC","value":0,"result":"5 - 10/âm tính","unit":"mg/dL"},{"key":9,"name":"BIL (Bilirubin)","value":0,"result":"âm tính / 0.4 - 0.8","unit":"mg/dL"}]}'
      }
      const res = useMedicalRecordStore()
      var response = await res.addNewDP(obj)

      console.log(response)

      this.jump(response.data.data.id)
    },
    async addNew2() {
      var obj = {
        image: [],
        type: 3,
        healthProfileId: this.idHP,
        contentMedical: `{"title":"Xét nghiệm máu mẫu ngày ${dayjs().format('DD-MM-YYYY')}","date":"${dayjs()}","drug":[{"key":1,"name":"WBC","value":"","result":"4 – 10","unit":"g/L"},{"key":2,"name":"LYM","value":"","result":"17 - 48","unit":"%"},{"key":3,"name":"NEU","value":"","result":"43 - 76","unit":"%"},{"key":4,"name":"MONO","value":"","result":"4 - 8","unit":"%"},{"key":5,"name":"EOS","value":"","result":"2 - 4","unit":"%"},{"key":6,"name":"BASO","value":"","result":"0 - 1","unit":"%"},{"key":7,"name":"RBC","value":"","result":"4,5 – 5,8","unit":"T/L"},{"key":8,"name":"HGB","value":"","result":"130 – 180","unit":"g/L"},{"key":9,"name":"HCT","value":"","result":"0,39 – 0,49","unit":"L/L"},{"key":10,"name":"MCV","value":"","result":"85 – 95","unit":"fL"},{"key":11,"name":"MCH","value":"","result":"28 – 32","unit":"pg"},{"key":12,"name":"MCHC","value":"","result":"320 – 360","unit":"g/L"},{"key":13,"name":"RDW","value":"","result":"11 - 15","unit":"%"},{"key":14,"name":"PLT","value":"","result":"150 – 400","unit":"G/L"},{"key":15,"name":"PCT","value":"","result":"0,016 – 0,036","unit":"L/L"},{"key":16,"name":"PDW","value":"","result":"11 - 15","unit":"%"},{"key":17,"name":"MPV","value":"","result":"5 – 8","unit":"fL"},{"key":18,"name":"P-LCR","value":"","result":"0,13 – 0,43","unit":"%"}]}`
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
      const userStore = useUserStore()
      if (userStore.user == null) {
        this.editMode = false
      }
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
      editMode: ref(false),
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
