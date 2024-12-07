<script setup>
import { doctorManagementStore } from '@/stores/doctorManagement'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
import { UpCircleOutlined, DownCircleOutlined, DeleteOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <div>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Quản lý bác sĩ" />
    <a-table
      :columns="columns"
      :data-source="listUser"
      :pagination="{ pageSize: 10 }"
      :scroll="{ y: 1500 }"
      bordered
      row-key="id"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'id'">
          {{ index + 1 }}
        </template>
        <template v-if="column.key === 'action'">
          <span>
            <a @click="editDoctor(record)">Edit</a>
          </span>
        </template>
      </template>
    </a-table>

    <a-drawer width="960" :open="drawerStage.open" :title="drawerStage.title" @close="onClose">
      <a-form
        :model="formState"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item label="ID" name="id" v-show="false">
          <a-input disabled :bordered="drawerStage.state" v-model:value="formState.id" />
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
        <a-form-item label="Thành phố" name="clinicCity">
          <a-input :bordered="drawerStage.state" v-model:value="formState.clinicCity" />
        </a-form-item>
        <a-form-item label="Chuyên ngành" name="specialization">
          <a-input :bordered="drawerStage.state" v-model:value="formState.specialization" />
        </a-form-item>

        <!-- History of Work Section -->
        <a-form-item label="Lịch sử làm việc" name="historyOfWork">
          <div>
            <div v-for="(work, index) in formState.historyOfWork" :key="index">
              <div class="row mb-3 align-items-start">
                <div class="col-md-3">
                  <label for="yearStart" class="form-label">Năm bắt đầu</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="work.yearStart"
                    :min="1900"
                    :max="new Date().getFullYear()"
                    placeholder="Năm bắt đầu"
                  />
                </div>

                <div class="col-md-3">
                  <label for="yearEnd" class="form-label">Năm kết thúc</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="work.yearEnd"
                    :min="work.yearStart"
                    :max="new Date().getFullYear()"
                    placeholder="Năm kết thúc"
                  />
                </div>

                <div class="col-md-4">
                  <label for="job" class="form-label">Công việc</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="work.job"
                    placeholder="Mô tả công việc"
                  />
                </div>

                <div class="col-md-2 d-flex flex-column">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="moveWorkUp(index)"
                    :disabled="index === 0"
                    >Up</button>
                  <a-button
                    type="button"
                    class="btn btn-primary"
                    @click="moveWorkDown(index)"
                    :disabled="index === formState.historyOfWork.length - 1"
                    >Down</a-button>
                  <a-button
                    type="button"
                    class="btn btn-primary"
                    @click="removeWork(index)"
                  >Delete</a-button>
                </div>
              </div>
            </div>
            <a-button type="dashed" block @click="addWork">Thêm mục mới</a-button>
          </div>
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
        open: false,
        title: 'Chỉnh sửa thông tin bác sĩ',
        state: false
      }),
      formState: ref({
        id: '',
        displayName: '',
        description: '',
        clinicAddress: '',
        clinicCity: '',
        specialization: '',
        historyOfWork: [] // Parsed JSON
      }),
      columns: [
        { title: '#', key: 'id', width: 80 },
        { title: 'Tên hiển thị', dataIndex: 'displayName', key: 'displayName', width: 150 },
        { title: 'Mô tả', dataIndex: 'description', key: 'description', width: 150 },
        { title: 'Địa chỉ', dataIndex: 'clinicAddress', key: 'clinicAddress', width: 150 },
        { title: 'Thành phố', dataIndex: 'clinicCity', key: 'clinicCity', width: 150 },
        { title: 'Chuyên ngành', dataIndex: 'specialization', key: 'specialization', width: 250 },
        { title: 'Action', key: 'action', width: 100 }
      ],
      listUser: ref([])
    }
  },

  async mounted() {
    this.loadData()
  },

  methods: {
    async loadData() {
      const doctorManageStore = doctorManagementStore()
      var listUser = await doctorManageStore.getAllDoctor()
      this.listUser = listUser.data
    },

    editDoctor(doctor) {
      const parsedHistoryOfWork = doctor.historyOfWork
        ? JSON.parse(doctor.historyOfWork)
        : []
      this.formState = { ...doctor, historyOfWork: parsedHistoryOfWork }
      this.drawerStage.open = true
      this.drawerStage.state = false
    },

    onClose() {
      this.drawerStage.open = false
    },

    async onFinish() {
      const doctorManageStore = doctorManagementStore()
      const id = this.formState.id
      const payload = {
        ...this.formState,
        historyOfWork: JSON.stringify(this.formState.historyOfWork)
      }
      const response = await doctorManageStore.updateDoctorById(id, payload)
      if (response.status === 204) {
        message.success('Cập nhật thành công')
        this.onClose()
        this.loadData()
      }
    },

    addWork() {
      this.formState.historyOfWork.push({
        yearStart: null,
        yearEnd: null,
        job: ''
      })
    },

    removeWork(index) {
      this.formState.historyOfWork.splice(index, 1)
    },

    moveWorkUp(index) {
      if (index > 0) {
        const work = this.formState.historyOfWork.splice(index, 1)[0]
        this.formState.historyOfWork.splice(index - 1, 0, work)
      }
    },

    moveWorkDown(index) {
      if (index < this.formState.historyOfWork.length - 1) {
        const work = this.formState.historyOfWork.splice(index, 1)[0]
        this.formState.historyOfWork.splice(index + 1, 0, work)
      }
    }
  },

  components: {
    UpCircleOutlined,
    DownCircleOutlined,
    DeleteOutlined,
  },
}
</script>
