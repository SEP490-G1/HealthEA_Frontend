<script setup></script>
<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      justify-content: center;
    "
  >
    <div style="width: 100%; display: flex; margin: 10px; justify-content: space-between">
      <div>
        <a-button style="margin: 10px" type="primary" @click="showDrawer"
          >Tạo lịch uống thuốc
        </a-button>
        <a-button style="margin: 10px" type="primary" @click="viewImage">Xem ảnh thực tế </a-button>
      </div>
      <div>
        <a-button style="margin: 10px" type="primary" @click="exportSave" :disabled="stageEditor"
          >Lưu thay đổi</a-button
        >
        <a-popconfirm
          title="Bạn có chắc muốn xóa tài liệu này?"
          @confirm="confirm"
          @cancel="cancelLolipop"
        >
          <a-button style="margin: 10px" type="primary" danger>Xóa</a-button>
        </a-popconfirm>
      </div>
    </div>
    <div class="ThePage">
      <div class="Content_ThePage">
        <a-typography-title v-model:content="formState.title" :level="2" editable />

        <div style="width: 100%">
          <a-form style="width: 100%" :model="formState" name="basic" autocomplete="off">
            <a-form-item label="Ngày khám:" name="date">
              <a-date-picker :bordered="false" v-model:value="formState.date" />
            </a-form-item>
            <a-form-item label="Bác sĩ kê đơn:" name="date">
              <a-input :bordered="false" v-model:value="formState.doctor" />
            </a-form-item>
            <a-form-item label="Lời khuyên bác sĩ:" name="date">
              <a-textarea
                :bordered="false"
                v-model:value="formState.doctorRecomend"
                :auto-size="{ minRows: 2, maxRows: 5 }"
              />
            </a-form-item>
            <a-form-item label="Chẩn đoán:" name="diagnose" style="height: 100px">
              <a-textarea
                :bordered="false"
                v-model:value="formState.diagnose"
                :auto-size="{ minRows: 2, maxRows: 5 }"
              />
            </a-form-item>
          </a-form>
        </div>
        <a-table :columns="columns" :data-source="dataSource" bordered>
          <template #bodyCell="{ column, text, record }">
            <template v-if="['name', 'dosage', 'quantity', 'unit'].includes(column.dataIndex)">
              <div>
                <a-input
                  v-if="editableData[record.key]"
                  v-model:value="editableData[record.key][column.dataIndex]"
                  style="margin: -5px 0"
                />
                <template v-else>
                  {{ text }}
                </template>
              </div>
            </template>
            <template v-else-if="column.dataIndex === 'operation'">
              <div class="editable-row-operations">
                <span v-if="editableData[record.key]">
                  <a-typography-link @click="save(record.key)">Save</a-typography-link>
                  <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
                    <a>Cancel</a>
                  </a-popconfirm>
                </span>
                <span v-else>
                  <a @click="edit(record.key)">Edit</a>
                  <a @click="remove(record.key)">Delete</a>
                </span>
              </div>
            </template>
          </template>
        </a-table>
        <a-button style="width: 100%" type="dashed" @click="add">Add new</a-button>
      </div>
    </div>
    <a-drawer
      v-model:open="open"
      class="custom-class"
      root-class-name="root-class-name"
      :root-style="{ color: 'blue' }"
      :width="1000"
      title="Ảnh của tài liệu này"
    >
      <a-drawer
        v-model:open="childrenDrawer"
        title="Two-level Drawer"
        width="320"
        :closable="false"
      >
        <a-button type="primary" @click="showChildrenDrawer">This is two-level drawer</a-button>
      </a-drawer>
      <template #extra>
        <a-button type="primary" @click="onCloseChild">Thêm ảnh</a-button>
      </template>
    </a-drawer>
    <!-- \\\\\\\\\\\\\ -->
    <a-drawer
      :title="titleEvent"
      :width="720"
      :open="openz"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClosez"
    >
      <a-form
        :model="formStatez"
        autocomplete="off"
        :rules="rules"
        layout="vertical"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="Tiêu đề" name="Title">
              <a-input
                v-model:value="formStatez.Title"
                placeholder="Nhập tiêu đề của bạn tại đây"
              />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="Sự kiện diễn ra ngày" name="EventDateTime">
              <a-date-picker
                v-model:value="formStatez.EventDateTime"
                placeholder="Chọn ngày bắt đầu"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
                :get-popup-container="(trigger) => trigger.parentElement"
              /> </a-form-item
          ></a-col>
          <a-col :span="6">
            <a-form-item name="StartTime" label="Thời gian bắt đầu">
              <a-time-picker
                v-model:value="formStatez.StartTime"
                placeholder="Giờ bắt đầu"
                format="HH:mm:ss"
                value-format="HH:mm:ss"
                :get-popup-container="(trigger) => trigger.parentElement"
              />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item label="Sự kiện kết thúc ngày" name="RepeatEndDate">
              <a-date-picker
                v-model:value="formStatez.RepeatEndDate"
                placeholder="Chọn ngày kết thúc"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
                :get-popup-container="(trigger) => trigger.parentElement"
              /> </a-form-item
          ></a-col>
          <a-col :span="6">
            <a-form-item name="EndTime" label="Thời gian kết thúc">
              <a-time-picker
                v-model:value="formStatez.EndTime"
                placeholder="Giờ kết thúc"
                format="HH:mm:ss"
                value-format="HH:mm:ss"
                :get-popup-container="(trigger) => trigger.parentElement"
              />
            </a-form-item>
          </a-col>
          <a-col :span="18">
            <a-form-item label="Vị trí" name="Location">
              <a-input v-model:value="formStatez.Location" placeholder="Vị trí" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="Kiểu lặp" name="RepeatFrequency">
              <a-select v-model:value="formStatez.RepeatFrequency">
                <a-select-option :value="1">No repeat</a-select-option>
                <a-select-option :value="2">Daily</a-select-option>
                <a-select-option :value="3">Weekly</a-select-option>
                <a-select-option :value="4">Monthly</a-select-option>
                <a-select-option :value="5">Yearly</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item label="Tạo thông báo">
          <a-row :gutter="16">
            <a-col v-for="(item, index) in formStatez.ReminderOffsets" :key="index" :span="24">
              <a-form-item style="width: 100%" :name="['ReminderOffsets']">
                <a-row>
                  <a-col :span="4">
                    <a-form-item :name="offsetValue">
                      <a-input-number v-model:value="item.offsetValue" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item :name="offsetUnit">
                      <a-select v-model:value="item.offsetUnit">
                        <a-select-option :value="1">phút</a-select-option>
                        <a-select-option :value="2">giờ</a-select-option>
                        <a-select-option :value="3">ngày</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>

                  <a-button style="margin-left: 3px" type="link" @click="remove(item)">
                    Xóa
                  </a-button>
                </a-row>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item>
                <a-button type="dashed" block @click="addItem">
                  <PlusOutlined />
                  Thêm kiểu thông báo
                </a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form-item>

        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="Mô tả" name="Description">
              <a-textarea
                v-model:value="formStatez.Description"
                :rows="4"
                placeholder="Hãy nhập mô tả của bạn"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-button type="primary" html-type="submit">Lưu</a-button>
      </a-form>
    </a-drawer>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash-es'
import { reactive, ref } from 'vue'
import dayjs from 'dayjs'
import { useMedicalRecordStore } from '@/stores/medicalRecord'
import { message } from 'ant-design-vue'
import { useRemindStore } from '@/stores/Remind'
export default {
  mounted() {
    this.loadDate()
    this.stageEditor = true
  },

  methods: {
    onFinish() {
      this.submitz()
    },
    async submitz() {
      var obj = this.formState
      try {
        obj.EventDateTime = dayjs(obj.EventDateTime).format('YYYY-MM-DD')
        obj.RepeatEndDate = dayjs(obj.RepeatEndDate).format('YYYY-MM-DDTHH:mm:ssZ')
        console.log(obj.RepeatEndDate)
      } catch (error) {
        message.error('Các trường dữ liệu thời gian trống')
        return
      }
      if (this.mayForm == 0) {
        const store = await useRemindStore()
        const result = await store.AddNewRemind(obj)
        console.log(result.status)
        let chuSoA = Math.floor(result.status / 100)
        if (chuSoA != 2) {
          message.error('Hãy kiểm tra lại input của bạn!')
          return
        }
        this.openz = !this.openz
      } else {
        console.log('loghere', obj)
        const store = await useRemindStore()
        const result = await store.updateRemind(obj)
        console.log('sssss', result)
      }
    },
    onCloseChild() {
      this.childrenDrawer = !this.childrenDrawer
    },
    viewImage() {
      this.onClose()
    },
    onClose() {
      this.open = !this.open
    },
    onClosez() {
      this.openz = !this.openz
    },
    confirm() {
      this.removeThis()
      this.$router.back()
    },
    async removeThis() {
      var id = this.$route.params.idD
      const mdStore = useMedicalRecordStore()
      var response = await mdStore.removeDP(id)
      console.log(response)
    },
    cancelLolipop() {},
    changeEditorTitle() {
      this.stageEditor = !this.stageEditor
    },
    async loadDate() {
      var id = this.$route.params.idD
      const mdStore = useMedicalRecordStore()
      var response = await mdStore.getOneDP(id)
      var obj = JSON.parse(response.data.data.contentMedical)
      this.dataSource = obj.drug == null ? [] : obj.drug
      this.formState = {
        title:
          obj.title != null
            ? obj.title
            : `${this.formState.title} ngày ${dayjs(obj.date).format('DD-MM-YYYY')}`,
        date: dayjs(obj.date),
        diagnose: obj.diagnose,
        doctorRecomend: obj.doctorRecomend,
        doctor: obj.doctor
      }

      this.stageEditor = await true
    },
    async exportSave() {
      var content = {
        title: this.formState.title,
        date: this.formState.date,
        diagnose: this.formState.diagnose,
        doctorRecomend: this.formState.doctorRecomend,
        doctor: this.formState.doctor,
        drug: this.dataSource
      }

      var obj = {
        healthProfileId: this.$route.params.id,
        type: 1,
        contentMedical: JSON.stringify(content),
        image: []
      }

      var id = this.$route.params.idD
      const mdStore = useMedicalRecordStore()
      console.log(obj)

      var response = await mdStore.updateDP(id, obj)
      console.log(response)
      message.success('Lưu thành công', 3)
      this.stageEditor = true
    },
    showDrawer() {
      this.mayForm = 0
      this.titleEvent = 'Tạo lịch uống thuốc'
      this.formStatez = {
        Title: this.formState.title,
        EventDateTime: '',
        StartTime: '',
        EndTime: '',
        Location: '',
        RepeatFrequency: 0,
        RepeatEndDate: '',
        Description: '',
        ReminderOffsets: []
      }
      this.openz = !this.openz
    },
    edit(key) {
      this.editableData[key] = cloneDeep(this.dataSource.filter((item) => key === item.key)[0])
    },
    save(key) {
      Object.assign(this.dataSource.filter((item) => key === item.key)[0], this.editableData[key])
      delete this.editableData[key]
    },
    remove(key) {
      const index = this.dataSource.findIndex((item) => item.key === key)
      if (index !== -1) {
        this.dataSource.splice(index, 1)
      }
    },
    add() {
      const maxKey = this.dataSource.reduce((max, item) => Math.max(max, item.key), 0)
      this.dataSource.push({
        key: maxKey + 1,
        name: '',
        quantity: 0,
        dosage: '',
        unit: ''
      })
      this.edit(maxKey + 1)
    },
    cancel(key) {
      delete this.editableData[key]
    }
  },
  watch: {
    formState: {
      handler(newValue) {
        this.stageEditor = false
        console.log('ssss', newValue)
      },
      deep: true // This is crucial for watching nested changes
    },
    dataSource: {
      handler(newValue) {
        this.stageEditor = false
        console.log('ssss', newValue)
      },
      deep: true // This is crucial for watching nested changes
    }
  },
  data() {
    return {
      rules: {
        Title: [
          {
            required: true,
            message: 'Hãy nhập tiêu đề sự kiện'
          }
        ],
        EventDateTime: [
          {
            required: true,
            message: 'Bắt buộc phải nhập thời gian '
          }
        ],
        StartTime: [
          {
            required: true,
            message: 'Trường này bắt buộc'
          }
        ],
        RepeatEndDate: [
          {
            required: true,
            message: 'Trường này bắt buộc nhập'
          }
        ],
        EndTime: [
          {
            required: true,
            message: 'Trường này bắt buộc nhập'
          }
        ],
        offsetUnit: [
          {
            required: true,
            message: 'Trường này bắt buộc nhập'
          }
        ]
      },
      openz: ref(false),
      mayForm: ref(0),
      formStatez: reactive({
        Title: 'Thụy',
        EventDateTime: '2024-11-06',
        StartTime: '04:04:26',
        EndTime: '04:04:26',
        Location: '',
        RepeatFrequency: 1,
        RepeatEndDate: '2024-11-08',
        Description: '',
        ReminderOffsets: [
          {
            offsetUnit: 1,
            offsetValue: 1
          }
        ]
      }),
      titleEvent: ref('Tạo một sự kiện mới'),
      childrenDrawer: ref(false),
      open: ref(false),
      stageEditor: ref(true),
      formState: {
        title: 'Đơn thuốc',
        date: dayjs('2002-04-14'),
        diagnose: '',
        doctorRecomend: '',
        doctor: ''
      },
      data: ref([]),
      dataSource: ref([]),
      editableData: reactive({}),
      columns: [
        {
          title: 'STT',
          dataIndex: 'key',
          key: 'key',
          width: 60
        },
        {
          title: 'Tên thuốc',
          dataIndex: 'name',
          key: 'name',
          ellipsis: true
        },
        {
          title: 'Liều lượng',
          dataIndex: 'dosage',
          key: 'dosage',
          ellipsis: 150
        },
        {
          title: 'Số lượng',
          dataIndex: 'quantity',
          key: 'quantity',
          width: 150
        },
        {
          title: 'Đơn vị',
          dataIndex: 'unit',
          key: 'unit',
          width: 200
        },
        {
          title: 'Hành động',
          dataIndex: 'operation'
        }
      ]
    }
  }
}
</script>
<style scoped>
.ThePage {
  background-color: white;
  width: 80%;
  border-radius: 30px;
  padding: 20px;
  min-height: 800px;
  border: 1px solid gray;
}
.Content_ThePage {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.editable-row-operations a {
  margin-right: 8px;
}
</style>
