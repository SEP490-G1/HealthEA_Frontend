<template>
  <div>
    <a-typography-title :level="3">Lịch hẹn của bạn</a-typography-title>
    <a-table :dataSource="listApointment" :columns="columns" :pagination="pagination">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'status'">
          <!-- //status: success | processing | default | error | warning -->
          <a-badge
            :status="record.status == 'Pending' ? 'processing' : 'success'"
            :text="record.status"
          />
        </template>
        <template v-if="column.dataIndex === 'action' && record.status == 'Pending'">
          <div v-if="record.status != 'Pending'">Đã hoàn thành</div>
          <div v-if="record.status != 'Pending'">Đã từ chối</div>
          <div class="editable-cell" v-if="record.status == 'Pending'">
            <a-popconfirm
              title="Bạn có xác nhận là chấp nhận lịch hẹn không?"
              @confirm="approve(record.appointmentId)"
            >
              <a-typography-link>Chấp nhận</a-typography-link>
            </a-popconfirm>
            -
            <a-popconfirm
              title="Bạn có xác nhận là từ chối nhận lịch hẹn không?"
              @confirm="reject(record.appointmentId)"
            >
              <a-typography-link>Từ chối</a-typography-link>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script>
import { useApointment } from '@/stores/ApointmentManagement'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'

import axios from 'axios'
import { ref } from 'vue'

export default {
  mounted() {
    this.loadData(1, 10)
  },
  methods: {
    async approve(id) {
      const userStore = useUserStore()
      const bodyParameter = {
        appointmentId: id
      }
      await axios
        .post('http://localhost:5217/api/Appointments/approve/' + id, bodyParameter, {
          headers: {
            Authorization: `Bearer ${userStore.token}`
          }
        })
        .then(async () => {
          message.success('Đã chấp nhận yêu cầu.')
          await this.loadData()
        })
        .catch(() => {
          message.error('Có lỗi xảy ra.')
        })
    },
    async reject(id) {
      const userStore = useUserStore()
      const bodyParameter = {
        appointmentId: id
      }
      await axios
        .post('http://localhost:5217/api/Appointments/reject/' + id, bodyParameter, {
          headers: {
            Authorization: `Bearer ${userStore.token}`
          }
        })
        .then(async () => {
          message.success('Đã từ chối yêu cầu.')
          await this.loadData()
        })
        .catch(() => {
          message.error('Có lỗi xảy ra.')
        })
    },
    async loadData() {
      const user = useApointment()
      var res = await user.getApoinmentDoctor(1, 10)
      this.listApointment = res.data.items

      var n = res.data.totalPages
      for (let i = 2; i <= n; i++) {
        let resz = await user.getApoinmentDoctor(i, 10)
        this.listApointment = this.mergeArray(this.listApointment, resz.data.items)
      }
    },
    mergeArray(list1, list2) {
      return list1.concat(list2)
    }
  },
  data() {
    return {
      listApointment: ref([]),
      columns: [
        {
          title: 'STT',
          dataIndex: 'key',
          key: 'key',
          width: 40
        },
        {
          title: 'Tiêu đề',
          dataIndex: 'title',
          key: 'title',
          width: 350
        },
        {
          title: 'Mô tả',
          dataIndex: 'description',
          key: 'description',
          width: 450
        },
        {
          title: 'Ngày hẹn',
          dataIndex: 'date',
          key: 'date',
          width: 150
        },
        {
          title: 'Giờ bắt đầu',
          dataIndex: 'startTime',
          key: 'startTime',
          width: 100
        },
        {
          title: 'Giờ kết thúc',
          dataIndex: 'endTime',
          key: 'endTime',
          width: 100
        },
        {
          title: 'Vị trí',
          dataIndex: 'location',
          key: 'location',
          width: 300
        },
        {
          title: 'Trạng thái',
          dataIndex: 'status',
          key: 'status',
          width: 100
        },
        {
          title: 'Hành động',
          dataIndex: 'action',
          key: 'action',
          width: 200
        }
      ]
    }
  }
}
</script>
<style lang=""></style>
