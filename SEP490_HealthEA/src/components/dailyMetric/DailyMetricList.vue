<template>
  <div>
    <a-collapse v-model:activeKey="activeKey" accordion>
      <a-collapse-panel
        v-for="(item, index) in sortByDateDesc(list)"
        :key="index"
        :header="convertHeader(item.date)"
      >
        <template #extra>
          <a-popconfirm
            title="Bạn có chắc muốn xóa dữ liệu này không!"
            ok-text="Đồng Ý"
            cancel-text="Hủy"
            @confirm="handleClick(item.id)"
          >
            <DeleteOutlined />
          </a-popconfirm>
        </template>
        <p>{{ item.date }}</p>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import { ref } from 'vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { useDailyMetricStore } from '@/stores/DailyMetricView'
export default {
  components: {
    DeleteOutlined
  },
  props: {
    title: String,
    list: Array
  },
  data() {
    return {
      activeKey: ref([])
    }
  },

  methods: {
    handleClick(id) {
      this.$emit('handleClickDelete', id)
    },
    removeElementById(array, id) {
      return array.filter((item) => item.id !== id)
    },
    convertHeader(data) {
      return 'Chỉ số của ngày: ' + data
    },
    sortByDateDesc(array) {
      if (array != null) {
        return array.sort((a, b) => {
          // So sánh ngày theo thứ tự giảm dần
          return new Date(b.date) - new Date(a.date)
        })
      }
      return array
    }
  }
}
</script>
<style></style>
