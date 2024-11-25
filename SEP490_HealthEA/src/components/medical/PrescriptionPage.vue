<script setup>
import { useMedicalRecordStore } from '@/stores/medicalRecord'
</script>
<template>
  <div>
    <a-typography-title :level="2" style="margin-top: 30px">Danh sách đơn thuốc</a-typography-title>
    <a-button type="primary" @click="addNew">Thêm mới</a-button>
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
        contentMedical: "{}"
      }
      const res = useMedicalRecordStore()
      var response = await res.addNewDP(obj)
      console.log(response);
      
    },

    jump(id) {
      this.$router.push(`/profileHealth/medical_record/prescription/${this.idHP}/detail/${id}`)
    },


    async loadData() {
      const res = useMedicalRecordStore()
      var list = await res.getListAType(this.idHP, 1)
      list.data.data.forEach((element) => {
        this.listPre.push({
          id: element.id,
          title: `Đơn thuốc tạo ngày ${dayjs(element.createDate).format('YYYY-MM-DD')}`,
          lastModified: `Lần thay đổi cuối  ${dayjs(element.lastModifyDate).format('YYYY-MM-DD, HH:mm:ss')}`
        })
      })
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
