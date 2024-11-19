<script setup>
import { userManagementStore } from '@/stores/userManagement'
import { ref } from 'vue'
</script>
<template lang="">
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="Quản lý người dùng"
      @back="() => null"
    />
    <a-table
      :columns="columns"
      :data-source="listUser"
      :pagination="{ pageSize: 10 }"
      :scroll="{ y: 1500 }"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <span>
            <a>Deactive</a>
            <a-divider type="vertical" />
            <a>Edit - {{ record.id }}</a>
            <a-divider type="vertical" />
            <a> Report </a>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'id',
          width: 80
        },
        {
          title: 'username',
          dataIndex: 'username',
          key: 'username',
          width: 150
        },
        {
          title: 'Họ',
          dataIndex: 'firstName',
          key: 'firstName',
          width: 150
        },
        {
          title: 'Tên',
          dataIndex: 'lastName',
          key: 'lastName',
          width: 150
        },
        {
          title: 'Ngày sinh',
          dataIndex: 'dob',
          key: 'dob',
          width: 150
        },
        {
          title: 'Số điện thoại',
          dataIndex: 'phone',
          key: 'phone',
          width: 150
        },
        {
          title: 'Quyền hạn',
          dataIndex: 'role',
          key: 'role',
          width: 150
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          width: 250
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          width: 250
        },
        {
          title: 'Action',
          key: 'action'
        }
      ],
      listUser: ref([])
    }
  },
  async mounted() {
    const userManageStore = userManagementStore()
    var listUser = await userManageStore.getAllUser()
    console.log(listUser)
    this.listUser = listUser
    console.log(this.listUser)
  }
}
</script>
<style lang=""></style>
