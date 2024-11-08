<template>
  <div class="card">
    <a-typography-title :level="3">Today plan</a-typography-title>
    <div class="carcontainer">
      <a-list
        class="demo-loadmore-list"
        :loading="initLoading"
        item-layout="horizontal"
        :data-source="listValue"
      >
        <template #loadMore>
          <div
            v-if="!initLoading && !loading"
            :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
          ></div>
        </template>
        <template #renderItem="{ item }">
          <a-list-item>
            <template #actions>
              <a key="list-loadmore-more">more</a>
            </template>
            <a-skeleton avatar :title="false" :loading="!!item.loading" active>
              <a-list-item-meta :description="item.description">
                <template #title>
                  <a href="https://www.antdv.com/">{{ item.title }}</a>
                </template>
              </a-list-item-meta>
            </a-skeleton>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>
<script>
import { useRemindStore } from '@/stores/Remind'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
export default {
  props: ['dateSelect'],
  data() {
    return {
      localMessage: null,
      initLoading: ref(true),
      loading: ref(false),
      listValue: ref([])
    }
  },
  mounted() {
    this.onLoadMore()
  },
  watch: {
    dateSelect() {
      console.log(this.dateSelect.format('YYYY-MM-DD'))
      this.loading = true
      this.onLoadMore()
    }
  },
  methods: {
    convertDateStart(date) {
      return dayjs(date).format('YYYY-MM-DDT00:00:00')
    },
    convertEndDate(date) {
      return dayjs(date).endOf('day').format('YYYY-MM-DDT23:59:59')
    },
    async onLoadMore() {
      try {
        this.listValue = []
        const store = await useRemindStore()
        const array = await store.getListEventRange(
          this.convertDateStart(this.convertDateStart(this.dateSelect)),
          this.convertEndDate(this.convertEndDate(this.dateSelect))
        )

        if (array == undefined) {
          this.loading = false
          this.initLoading = false
          return
        }
        this.loading = false
        this.initLoading = false
        this.listValue = await array.events
        console.log(this.listValue)
      } catch (error) {
        console.log(error)
        message.error('Không thể lấy được dữ liệu hãy gửi lại!', 3)
      }
    }
  }
}
</script>
<style scoped>
.card {
  height: 100%;
  border: black;
  border-radius: 20px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  transition: box-shadow 0.3s;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
