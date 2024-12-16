<script setup>
import { useMedicalRecordStore } from '@/stores/medicalRecord'
import { PlusOutlined } from '@ant-design/icons-vue'
</script>
<template>
  <div>
    <a-modal
      v-model:open="open"
      class="custom-class"
      root-class-name="root-class-name"
      :root-style="{ color: 'blue' }"
      style="color: red"
      title="Scan ảnh đơn thuốc với AI"
      placement="right"
      @ok="handleSubmit"
      ok-text="Quét đơn thuốc"
      :okButtonProps="{ disabled: loadingBtn }"
    >
      <a-upload
        v-model:file-list="fileList"
        accept=".png,.jpg"
        @preview="handlePreview"
        list-type="picture-card"
        :beforeUpload="beforeUpload"
      >
        <div v-if="fileList.length < 1">
          <plus-outlined />
          <div style="margin-top: 8px">Tải ảnh lên</div>
        </div>
      </a-upload>
      <div style="margin-top: 8px">Chỉ chấp nhận ảnh png và jpg</div>
    </a-modal>
    <a-typography-title :level="2" style="margin-top: 30px">Danh sách đơn thuốc</a-typography-title>
    <a-dropdown :trigger="['click']">
      <template #overlay>
        <a-menu>
          <a-menu-item @click="addNew" key="1"> Thêm một đơn thuốc trống</a-menu-item>
          <a-menu-item @click="scanImage" key="3"> Scan ảnh đơn thuốc </a-menu-item>
        </a-menu>
      </template>
      <a-button type="primary" size="large"> Thêm mới </a-button>
    </a-dropdown>
    <div>
      <a-list item-layout="horizontal" :data-source="listPre">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta :description="item.lastModified">
              <template #title>
                <a @click="jump(item.id)">{{ item.title }}</a>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import dayjs from 'dayjs'
import axios from 'axios'
import { message, Upload } from 'ant-design-vue'
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
    async handleSubmit() {
      this.loadingBtn = true
      if (this.fileList.length === 0) {
        message.warning('Xin hãy chọn hình ảnh!')
        this.loadingBtn = false
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
      const uploadMessage1 = message.loading('Đang quét ảnh...', 0)
      var obj = {
        image: [],
        type: 1,
        healthProfileId: this.idHP,
        contentMedical: '{}'
      }
      try {
        const response = await axios.post(`${API_URL}/api/Scan/prescription`, formData1, {
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
          title: `Đơn thuốc được quét ngày ${dayjs().format('DD-MM-YYYY')}`,
          drug: response.data
        }
        obj.contentMedical = JSON.stringify(object)
        uploadMessage1()
        message.success('Quét ảnh thành công!')
      } catch (error) {
        uploadMessage1() // Hide the loading message
        message.error('Quét ảnh lỗi xin hãy thử lại')
        console.error('Scan failed:', error)
        this.loadingBtn = false

        return
      }
      const uploadMessage2 = message.loading('Đang đẩy ảnh của bạn...', 0)
      try {
        const objUpload = await axios.post(`${API_URL}/api/Images`, formData2, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        uploadMessage2()
        obj.image = [`${objUpload.data[0].id}`]
        message.success('Đẩy ảnh thành công!')
      } catch (err) {
        uploadMessage2() // Hide the loading message
        message.error('Đẩy ảnh thất bại ')
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
      this.loadingBtn = false
    },
    async addNew() {
      var obj = {
        image: [],
        type: 1,
        healthProfileId: this.idHP,
        contentMedical: '{}'
      }
      const res = useMedicalRecordStore()
      var response = await res.addNewDP(obj)
      this.jump(response.data.data.id)
      this.loadData()
    },
    showDrawer() {
      this.open = !this.open
    },
    async scanImage() {
      this.showDrawer()
    },
    jump(id) {
      this.$router.push(`/profileHealth/medical_record/prescription/${this.idHP}/detail/${id}`)
    },

    getTitle(value) {
      var obj = JSON.parse(value.contentMedical)
      if (undefined == obj.title) {
        return `Đơn thuốc ngày ${dayjs(obj.date).format('DD-MM-YYYY')}`
      }
      return obj.title
    },

    async loadData() {
      const res = useMedicalRecordStore()
      var listnew = []
      var list = await res.getListAType(this.idHP, 1)
      const storeUser = useUserStore()
      let isUser = null
      try {
        isUser = storeUser.user.id.toLowerCase()
      } catch {
        console.log('chill guy')
      }
      this.author = list.data.data[0].userId == isUser
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
      author: ref(false),
      loadingBtn: ref(false),
      open: ref(false),
      listPre: ref([]),
      idHP: this.$route.params.id,
      fileList: ref([])
    }
  },
  beforeUpload(file) {
    const isPNG = file.type === 'image/png'
    console.log('sfile', file)

    if (!isPNG) {
      message.error(`Không được upfile khác png`)
    }
    return isPNG || Upload.LIST_IGNORE
  }
}
</script>
<style scoped></style>
