<script setup>
import { useMedicalRecordStore } from '@/stores/medicalRecord'
</script>
<template>
  <div>
    <a-typography-title :level="2" style="margin-top: 30px">Danh sách tiêm chủng</a-typography-title>
    <a-button type="primary" @click="addNew">Thêm mới</a-button>
    <div>
      <a-list item-layout="horizontal" :data-source="listPre">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta :description="item.lastModified">
              <template #title>
                <a @click="jump(item.id)">{{ item.title }}</a>
              </template>
              <template #avatar>
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
export default {
  async mounted() {
    this.loadData()
  },
  methods: {
    async addNew() {
      var obj = {
        image: [],
        type: 2,
        healthProfileId: this.idHP,
        contentMedical: '{}'
      }
      const res = useMedicalRecordStore()
      var response = await res.addNewDP(obj)
      this.jump(response.data.data.id)
      this.loadData()
    },

    jump(id) {
      this.$router.push(`/profileHealth/medical_record/prescription/${this.idHP}/detail/${id}`)
    },
    getTitle(value) {
      var obj = JSON.parse(value.contentMedical)
      if (undefined == obj.title) {
        return `Lịch tiêm ngày ${dayjs(obj.date).format('DD-MM-YYYY')}`
      }
      return obj.title
    },
    async loadData() {
      const res = useMedicalRecordStore()
      var listnew = []
      var list = await res.getListAType(this.idHP, 2)
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
      listPre: ref([]),
      idHP: this.$route.params.id
    }
  }
}
</script>
<style scoped></style>
