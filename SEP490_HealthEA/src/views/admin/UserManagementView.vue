<script setup>
import { userManagementStore } from '@/stores/userManagement'
import { ref } from 'vue'
</script>
<template lang="">
  <div>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Quản lý người dùng" />
    <a-button type="primary" @click="btnClick">Thêm người dùng</a-button>
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
            <a-typography-link @click="btnEditClick(record)">Edit</a-typography-link>
            <a-divider type="vertical" />
            <a> Report </a>
          </span>
        </template>
      </template>
    </a-table>
    <a-drawer width="640" :open="drawerStage.open" :title="drawerStage.title" @close="onClose">
      <a-form
        :model="formState"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="ID"
          name="id"
          v-show="false"
          :rules="[{ required: true, message: 'Không được để trống!' }]"
        >
          <a-input disabled="" :bordered="drawerStage.state" v-model:value="formState.id" />
        </a-form-item>
        <a-form-item
          label="Tên đăng nhập"
          name="username"
          :rules="[{ required: true, message: 'Không được để trống!' }]"
        >
          <a-input :bordered="drawerStage.state" v-model:value="formState.username" />
        </a-form-item>
        <a-form-item
          label="Mật Khẩu"
          name="password"
          v-if="!drawerStage.edit"
          :rules="[{ required: true, message: 'Không được để trống!' }]"
        >
          <a-input :bordered="drawerStage.state" v-model:value="formState.password" />
        </a-form-item>

        <a-form-item
          label="Email"
          name="email"
          :rules="[{ required: true, message: 'Không được để trống!' }]"
        >
          <a-input :bordered="drawerStage.state" v-model:value="formState.email" />
        </a-form-item>
        <a-form-item
          label="Họ"
          name="firstName"
          :rules="[{ required: true, message: 'Không được để trống!' }]"
        >
          <a-input :bordered="drawerStage.state" v-model:value="formState.firstName" />
        </a-form-item>
        <a-form-item
          label="Tên"
          name="lastName"
          :rules="[{ required: true, message: 'Không được để trống!' }]"
        >
          <a-input :bordered="drawerStage.state" v-model:value="formState.lastName" />
        </a-form-item>
        <a-form-item label="Số điện thoại" name="phone">
          <a-input :bordered="drawerStage.state" v-model:value="formState.phone" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button @click="onFinish" type="primary" html-type="submit">Lưu</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>
<script>
import { useUserStore } from '@/stores/user'
export default {
  data() {
    return {
      drawerStage: {
        title: ref('Thêm người dùng'),
        open: ref(false),
        state: true,
        edit: false
      },
      formState: ref({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: ''
      }),
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
    this.listUser = listUser
  },
  methods: {
    async onFinish() {
      console.log(this.formState)
      if (this.drawerStage.edit == false) {
        const user = useUserStore()
        let response = await user.Register(this.form)
        console.log(response)
      }
    },
    onClose() {
      this.drawerStage.open = !this.drawerStage.open
    },
    btnClick() {
      this.onClose()
      this.formState = {
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: ''
      }
      this.drawerStage.edit = false
    },
    btnEditClick(item) {
      this.drawerStage.edit = true
      this.formState = item
      this.onClose()
    }
  }
}
</script>
<style lang=""></style>
