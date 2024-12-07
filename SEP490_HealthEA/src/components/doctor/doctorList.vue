<template>
  <a-layout style="padding: 30px 50px">
    <a-layout-content
      :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '10px' }"
    >
      <a-flex vertical style="margin-top: 30">
        <a-carousel arrows>
          <template #prevArrow>
            <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
              <LeftCircleOutlined />
            </div>
          </template>
          <template #nextArrow>
            <div class="custom-slick-arrow" style="right: 10px">
              <RightCircleOutlined />
            </div>
          </template>
          <div v-for="(list, index) in listDoctor" :key="index" style="display: flex">
            <div style="display: flex; justify-content: center">
              <a-card
                @click="handleClickCard(item.id)"
                v-for="(item, index) in list"
                :key="index"
                hoverable
                style="width: 300px; height: 350px; margin: 10px; overflow: hidden"
              >
                <template #cover>
                  <div style="height: 250px; overflow: hidden">
                    <img
                      style="width: 100%"
                      alt="example"
                      :src="
                        item.user.avatar == null
                          ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJgCpoJWxPrW-qqRTgNA_mwv3DrikuJ4e3cA&s'
                          : item.user.avatar
                      "
                    />
                  </div>
                </template>
                <a-card-meta
                  style="height: 80px; overflow: hidden"
                  :title="`${item.displayName} - ${item.specialization}`"
                >
                  <template #description>
                    <div style="text-overflow: ellipsis">
                      {{ item.description }}
                    </div>
                  </template>
                </a-card-meta>
              </a-card>
            </div>
          </div>
        </a-carousel>
      </a-flex>
    </a-layout-content>
  </a-layout>
</template>
<script>
import { doctorManagementStore } from '@/stores/doctorManagement'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
export default {
  components: {
    LeftCircleOutlined,
    RightCircleOutlined
  },
  mounted() {
    this.loadData()
  },
  data() {
    return {
      listDoctor: ref([])
    }
  },
  methods: {
    handleClickCard(id) {
      console.log(id)
      this.$router.push(`/listDoctor/${id}`)
    },
    async loadData() {
      const store = doctorManagementStore()
      var response = await store.getAllDoctor()
      var listNew = response.data
      console.log(response.data)

      this.listDoctor = this.sliceArray(listNew, 5)
      console.log(this.listDoctor)
    },
    sliceArray(list, max) {
      const results = []
      let tempArr = []

      for (let i = 0; i < list.length; i++) {
        tempArr.push(list[i])
        if (tempArr.length === max || i === list.length - 1) {
          results.push([...tempArr])
          tempArr = []
        }
      }

      return results
    },
    onChange(current) {
      console.log(current)
    }
  }
}
</script>
<style scoped>
/* For demo */
:deep(.slick-slide) {
  text-align: center;
  height: 380px;
  line-height: 160px;
  overflow: hidden;
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #6b6b6b4f;
  transition: ease all 0.3s;
  opacity: 1;
  z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #000;
  opacity: 0.5;
}

:deep(.slick-slide h3) {
  color: #000;
}
:deep(.slick-dots li button) {
  background-color: #000;
}
:deep(.slick-dots li.slick-active button) {
  background-color: #000;
}
:deep(.slick-dots-bottom) {
  bottom: -10px;
}
</style>
