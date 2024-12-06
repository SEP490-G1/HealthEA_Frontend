<script setup>
import { userManagementStore } from '@/stores/userManagement'
import { ref } from 'vue'
</script>

<template>
  <div>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Quản lý người dùng" />
    <a-button type="primary" @click="btnClick">Thêm người dùng</a-button>
    <a-table
      :columns="columns"
      :data-source="listUser"
      :pagination="{ pageSize: 10 }"
      :scroll="{ y: 1500 }"
      bordered
      rowKey="id"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'action'">
          <span>
            <a-button @click="btnEditClick(record)" type="link">Edit</a-button>
          </span>
        </template>
        <template v-else-if="column.key === 'username'">
          {{ record.username }} <a-tag :color="record.status === 'ACTIVE' ? 'green' : 'red'">{{ record.status }}</a-tag>
        </template>
        <template v-else-if="column.key === 'dob'">
          {{ record.dob ? dayjs(record.dob).format('DD/MM/YYYY') : 'None' }}
        </template>
        <template v-else>
          <span>{{ column.key === 'index' ? index + 1 : record[column.key] }}</span>
        </template>
      </template>
    </a-table>
    <a-drawer width="640" :open="drawerStage.open" :title="drawerStage.title" @close="onClose">
      <a-form
        :model="formState"
        autocomplete="off"
      >
        <a-form-item
          label="ID"
          name="id"
          v-show="false"
          :rules="[{ required: true, message: 'Không được để trống!' }]"
        >
          <a-input disabled :bordered="drawerStage.state" v-model:value="formState.id" />
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
        <a-form-item
          label="Ngày sinh"
          name="dob"
          :rules="[{ required: true, message: 'Không được để trống!' }]"
        >
          <a-date-picker v-model:value="formState.dob" format="YYYY-MM-DD" />
        </a-form-item>
        <a-form-item label="Số điện thoại" name="phone">
          <a-input :bordered="drawerStage.state" v-model:value="formState.phone" />
        </a-form-item>
        <a-form-item label="Trạng thái" name="status" v-if="drawerStage.edit">
          <a-select v-model:value="formState.status" :bordered="drawerStage.state">
            <a-select-option value="ACTIVE">ACTIVE</a-select-option>
            <a-select-option value="INACTIVE">INACTIVE</a-select-option>
            <a-select-option value="BANNED">BANNED</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="Vai trò"
          name="role"
          v-if="!drawerStage.edit"
          :rules="[{ required: true, message: 'Không được để trống!' }]"
        >
          <a-select v-model:value="formState.role" :bordered="drawerStage.state">
            <a-select-option value="CUSTOMER">CUSTOMER</a-select-option>
            <a-select-option value="DOCTOR">DOCTOR</a-select-option>
            <a-select-option value="ADMIN">ADMIN</a-select-option>
          </a-select>
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
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'
export default {
  data() {
    return {
      drawerStage: {
        title: ref('Thêm người dùng'),
        open: ref(false),
        state: true,
        edit: ref(false)
      },
      formState: ref({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        dob: null, // Default dob is null
        role: 'CUSTOMER', // Default role is CUSTOMER for Add mode
        status: 'ACTIVE' // Default status
      }),
      columns: [
        {
          title: '#',
          key: 'index',
          width: 80
        },
        {
          title: 'username',
          dataIndex: 'username',
          key: 'username',
          width: 250
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
          title: 'Action',
          key: 'action',
          width: 100
        }
      ],
      listUser: ref([]),
      userId: ref(null)
    }
  },
  async mounted() {
    await this.getAll()
  },
  methods: {
    async onFinish() {
      const payload = {
        ...this.formState,
        dob: this.formState.dob ? this.formState.dob.format('YYYY-MM-DD') : null // Convert back to string
      }
      const user = useUserStore()
      console.log(payload)
      console.log("Edit Mode: ", this.drawerStage.edit);
      if (!this.drawerStage.edit) {
        let response = await user.Register(payload)
        console.log(response)
        if (response.status === 200) {
          message.success('Tạo người dùng thành công')
          await this.getAll()
          this.onClose()
        } else {
          message.error(`Thất bại: ${response.response.data.message}`)
        }
      } else {
        let response = await user.UpdateUser(payload, this.userId)
        console.log(response)
        if (response.status === 200) {
          message.success('Chỉnh sửa thông tin người dùng thành công')
          await this.getAll()
          this.onClose()
        } else {
          message.error(`Thất bại: ${response.response.data.message}`)
        }
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
        phone: '',
        dob: null,
        role: 'CUSTOMER',
        status: 'ACTIVE' // Default to ACTIVE when adding a new user
      }
      this.drawerStage.edit = false
      this.userId = ref(null)
      this.drawerStage.title = ref('Thêm người dùng')
    },
    btnEditClick(item) {
      this.drawerStage.edit = true
      this.drawerStage.title = ref('Chỉnh sửa thông tin người dùng')
      // Convert dob to dayjs object when editing
      this.formState = {
        ...item,
        dob: item.dob ? dayjs(item.dob, 'YYYY-MM-DD') : null
      }
      this.userId = ref(item.id)
      console.log(item)
      this.onClose()
    },
    async getAll() {
      const userManageStore = userManagementStore()
      var listUser = await userManageStore.getAllUser()
      this.listUser = listUser.map((user) => ({
        ...user,
        dob: user.dob ? dayjs(user.dob, 'YYYY-MM-DD') : null
      }))
      console.log(this.listUser)
    }
  }
}
</script>
