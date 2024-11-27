<script setup>
import { doctorManagementStore } from '@/stores/doctorManagement'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
</script>
<template lang="">
  <div>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Quản lý bác sĩ" />
    <a-button type="primary" style="margin: 10px" @click="openAdd">Thêm bác sĩ</a-button>
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
            <a @click="removeDoctor(record.id)">Delete</a>
            <a-divider type="vertical" />
            <a @click="editDoctor(record)">Edit</a>
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
        <a-form-item label="ID" name="id" v-show="false">
          <a-input disabled="" :bordered="drawerStage.state" v-model:value="formState.id" />
        </a-form-item>
        <a-form-item label="Tên hiển thị" name="displayName">
          <a-input :bordered="drawerStage.state" v-model:value="formState.displayName" />
        </a-form-item>
        <a-form-item label="Mô tả bác sĩ" name="description">
          <a-textarea :bordered="drawerStage.state" v-model:value="formState.description" />
        </a-form-item>
        <a-form-item label="Địa chỉ" name="clinicAddress">
          <a-input :bordered="drawerStage.state" v-model:value="formState.clinicAddress" />
        </a-form-item>
        <a-form-item label="Thành phô" name="clinicCity">
          <a-input :bordered="drawerStage.state" v-model:value="formState.clinicCity" />
        </a-form-item>
        <a-form-item label="Chuyên ngành" name="specialization">
          <a-input :bordered="drawerStage.state" v-model:value="formState.specialization" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button :bordered="drawerStage.state" type="primary" html-type="submit">Lưu</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawerStage: ref({
        stateEdit: 0,
        open: false,
        title: 'Tạo bác sĩ mới',
        change: false,
        state: false
      }),
      formState: ref({}),
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'id',
          width: 80
        },
        {
          title: 'Tên hiển thị',
          dataIndex: 'displayName',
          key: 'displayName',
          width: 150
        },
        {
          title: 'Mô tả',
          dataIndex: 'description',
          key: 'description',
          width: 150
        },
        {
          title: 'Địa chỉ',
          dataIndex: 'clinicAddress',
          key: 'clinicAddress',
          width: 150
        },
        {
          title: 'Thành phố',
          dataIndex: 'clinicCity',
          key: 'clinicCity',
          width: 150
        },
        {
          title: 'Lịch sử làm việc',
          dataIndex: 'historyOfWork',
          key: 'historyOfWork',
          width: 150
        },
        {
          title: 'Số lần đặt lịch',
          dataIndex: 'numberOfAppointments',
          key: 'numberOfAppointments',
          width: 150
        },
        {
          title: 'Số lần khám online đã làm việc',
          dataIndex: 'numberOfVideoCalls',
          key: 'numberOfVideoCalls',
          width: 250
        },
        {
          title: 'Chuyên ngành',
          dataIndex: 'specialization',
          key: 'specialization',
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
    this.loadData()
  },
  methods: {
    openAdd() {
      this.drawerStage.open = !this.drawerStage.open
      this.formState = {}
      this.drawerStage.state = true
    },
    async onFinish(doctor) {
      if (this.drawerStage.state == false) {
        var id = doctor.id
        delete doctor.id
        const doctorManageStore = doctorManagementStore()
        var response = await doctorManageStore.updateDoctorById(id, doctor)
        console.log(response)
        if (response.status == 204) {
          message.success('Thành công', 10)
          this.onClose()
          this.loadData()
        }
      }

      if (this.drawerStage.state == true) {
        // const doctorManageStore = doctorManagementStore()
        // var response = await doctorManageStore.updateDoctorById(id, doctor)
        // console.log(response)
        // if (response.status == 204) {
        //   message.success('Thành công', 10)
        //   this.onClose()
        //   this.loadData()
        // }
      }
    },
    async editDoctor(doctor) {
      this.formState = doctor
      this.onClose()
      this.drawerStage.state = false
    },
    onClose() {
      this.drawerStage.open = !this.drawerStage.open
    },
    async loadData() {
      const doctorManageStore = doctorManagementStore()
      var listUser = await doctorManageStore.getAllDoctor()
      this.listUser = listUser.data
    },
    async removeDoctor(id) {
      console.log(id)
      // const doctorManageStore = doctorManagementStore()
      // var response = await doctorManageStore.getAllDoctor(id)
      // console.log(response)
      // this.loadData()
    }
  }
}
</script>
<style lang=""></style>
