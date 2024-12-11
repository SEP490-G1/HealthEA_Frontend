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
    >
      <a-upload  v-model:file-list="fileList" list-type="picture-card" :beforeUpload="beforeUpload">
        <div v-if="fileList.length < 1">
          <plus-outlined />
          <div style="margin-top: 8px">Upload</div>
        </div>
      </a-upload>

      <a-button
        type="primary"
        class="submit-button"
        :loading="loading"
        :disabled="loading"
        @click="handleSubmit"
      >
        Quét đơn thuốc
      </a-button>
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
import { message, Upload } from 'ant-design-vue'
export default {
  async mounted() {
    this.loadData()
  },
  methods: {
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
