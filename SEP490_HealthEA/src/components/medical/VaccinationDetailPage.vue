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
    <a-drawer
      title="Tạo nhắc nhở lịch tiêm"
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

    <div
      v-if="author"
      style="width: 100%; display: flex; margin: 10px; justify-content: space-between"
    >
      <div>
        <a-button style="margin: 10px" type="primary" @click="onClosez"
          >Tạo nhắc nhở tiêm
        </a-button>
        <!-- <a-button style="margin: 10px" type="primary" @click="viewImage">Xem ảnh thực tế </a-button> -->
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
        <a-typography-title v-model:content="formState.title" :level="2" />

        <div style="width: 100%">
          <a-form style="width: 100%" :model="formState" name="basic" autocomplete="off">
            <a-form-item label="Lịch hẹn tiêm:" name="date">
              <a-date-picker
                :disabled="!author"
                show-time
                :bordered="false"
                v-model:value="formState.date"
              />
            </a-form-item>
            <a-form-item label="Loại vaccine:" name="date">
              <a-auto-complete
                :disabled="!author"
                :bordered="false"
                v-model:value="formState.doctor"
                :options="options"
                style="width: 500px"
                placeholder="Trống"
                :filter-option="filterOption"
              >
                <template #clearIcon>
                  <close-outlined />
                </template>
              </a-auto-complete>
              <!-- <a-input :bordered="false" v-model:value="formState.doctor" /> -->
            </a-form-item>
            <a-form-item label="Địa chỉ tiêm:" name="date">
              <a-textarea
                :disabled="!author"
                :bordered="false"
                v-model:value="formState.doctorRecomend"
                :auto-size="{ minRows: 2, maxRows: 5 }"
              />
            </a-form-item>
            <a-form-item label="Ghi chú:" name="diagnose" style="height: 100px">
              <a-textarea
                :disabled="!author"
                :bordered="false"
                v-model:value="formState.diagnose"
                :auto-size="{ minRows: 2, maxRows: 5 }"
              />
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
    <a-drawer v-model:open="open" style="color: black" :width="1000" title="Ảnh của tài liệu này">
      <template #extra>
        <a-button type="primary" @click="onCloseChild">Thêm ảnh</a-button>
      </template>
      <ListImageDrawer v-model:listImg="listImg" />
    </a-drawer>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash-es'
import { reactive, ref } from 'vue'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { useMedicalRecordStore } from '@/stores/medicalRecord'
import ListImageDrawer from '@/components/medical/ListImageDrawer.vue'
import { useRemindStore } from '@/stores/Remind'
import { useUserStore } from '@/stores/user'
export default {
  components: {
    ListImageDrawer,
    CloseOutlined
  },
  mounted() {
    this.loadDate()
    this.stageEditor = true
  },

  methods: {
    onFinish() {
      this.submitz()
    },
    async submitz() {
      var obj = this.formStatez
      try {
        obj.EventDateTime = dayjs(obj.EventDateTime).format('YYYY-MM-DD')
        obj.RepeatEndDate = dayjs(obj.RepeatEndDate).format('YYYY-MM-DDTHH:mm:ssZ')
        console.log(obj.RepeatEndDate)
      } catch (error) {
        message.error('Các trường dữ liệu thời gian trống')
        return
      }
      const store = await useRemindStore()
      const result = await store.AddNewRemind(obj)

      console.log('Kết quả', result)
      let chuSoA = Math.floor(result.status / 100)
      if (chuSoA != 2) {
        message.error('Hãy kiểm tra lại input của bạn!')
        return
      }
      this.openz = !this.openz
    },
    filterOption(input, option) {
      return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0
    },
    add() {
      const maxKey = this.dataSource.reduce((max, item) => Math.max(max, item.key), 0)
      this.dataSource.push({
        key: maxKey + 1,
        name: '',
        value: 0,
        result: '',
        unit: ''
      })
      this.edit(maxKey + 1)
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

    cancelLolipop() {},
    changeEditorTitle() {
      this.stageEditor = !this.stageEditor
    },
    async loadDate() {
      var id = this.$route.params.idD
      const mdStore = useMedicalRecordStore()
      var response = await mdStore.getOneDP(id)
      const storeUser = useUserStore()
      let isUser = null
      try {
        isUser = storeUser.user.id.toLowerCase()
      } catch {
        console.log('chill guy')
      }
      this.author = response.data.data.userId == isUser
      this.listImg = response.data.data.image
      var obj = JSON.parse(response.data.data.contentMedical)
      this.dataSource = obj.drug == null ? '' : obj.drug
      this.formState = {
        title:
          obj.title != null && obj.title != ''
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
      var title = `${this.formState.doctor}`
      this.formState.title =
        title == null ? `Lịch tiêm ngày ${dayjs(obj.date).format('DD-MM-YYYY')}` : title
      var content = {
        title: title,
        date: this.formState.date,
        diagnose: this.formState.diagnose,
        doctorRecomend: this.formState.doctorRecomend,
        doctor: this.formState.doctor,
        drug: this.dataSource
      }

      var obj = {
        healthProfileId: this.$route.params.id,
        type: 2,
        contentMedical: JSON.stringify(content),
        image: []
      }

      var id = this.$route.params.idD
      const mdStore = useMedicalRecordStore()
      var response = await mdStore.updateDP(id, obj)
      console.log(response)
      message.success('Lưu thành công')
      this.stageEditor = true
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
    cancel(key) {
      delete this.editableData[key]
    },
    onClosez() {
      this.formStatez.Title = this.formState.title
      this.formStatez.RepeatEndDate = this.addOneDay(this.formState.date)
      this.formStatez.EventDateTime = this.formState.date
      this.formStatez.Location = this.formState.doctorRecomend
      this.openz = !this.openz
    },
    addOneDay(dateString) {
      // Chuyển đổi chuỗi thành đối tượng Date
      const date = new Date(dateString)

      // Cộng thêm 1 ngày
      date.setDate(date.getDate() + 1)

      // Chuyển đổi lại thành chuỗi theo định dạng YYYY-MM-DD
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0 nên cộng 1 và thêm 0 đằng trước nếu cần
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
  },
  watch: {
    formState: {
      handler() {
        this.stageEditor = false
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
      author: ref(false),
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
      formStatez: reactive({
        Title: '',
        EventDateTime: '',
        StartTime: '08:00:00',
        EndTime: '12:00:00',
        Location: '',
        RepeatFrequency: 1,
        RepeatEndDate: '',
        Description: '',
        ReminderOffsets: [
          {
            offsetUnit: 1,
            offsetValue: 1
          }
        ]
      }),
      openz: ref(false),
      options: [
        { value: 'Phòng bệnh lao' },
        { value: 'Phòng viêm gan B' },
        { value: '6 trong 1 phòng bệnh bạch hầu – ho gà – uốn ván – bại liệt – HiB – viêm gan B' },
        { value: 'Ngừa Rotavirus' },
        { value: 'Phòng bệnh viêm não Nhật Bản' },
        { value: 'Phòng Cúm' },
        { value: 'Phòng phế cầu khuẩn' },
        { value: 'Phòng thủy đậu' },
        { value: 'Phòng bệnh sởi' },
        { value: 'Phòng quai bị' },
        { value: 'HPV' }
      ],
      listImg: ref([]),
      childrenDrawer: ref(false),
      open: ref(false),
      stageEditor: ref(true),
      formState: {
        title: 'Lịch Tiêm',
        date: dayjs('2002-04-14'),
        diagnose: '',
        doctorRecomend: '',
        doctor: ''
      },
      data: ref([]),
      dataSource: ref(),
      editableData: reactive({}),
      columns: [
        {
          title: '',
          dataIndex: 'key',
          key: 'key',
          width: 60
        },
        {
          title: 'Thông số',
          dataIndex: 'name',
          key: 'name',
          ellipsis: true
        },
        {
          title: 'Kết quả',
          dataIndex: 'value',
          key: 'value',
          ellipsis: 150
        },
        {
          title: 'Tham chiếu',
          dataIndex: 'result',
          key: 'result',
          width: 150
        },
        {
          title: 'Đơn vị',
          dataIndex: 'unit',
          key: 'unit',
          width: 150
        },
        {
          title: 'Hành động',
          dataIndex: 'operation',
          key: 'operation',
          width: 150
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
  min-height: 300px;
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
