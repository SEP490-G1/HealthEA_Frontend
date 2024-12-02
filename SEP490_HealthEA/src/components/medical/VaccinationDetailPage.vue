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
            <a-form-item label="Lịch hẹn tiêm:" name="date">
              <a-date-picker show-time :bordered="false" v-model:value="formState.date" />
            </a-form-item>
            <a-form-item label="Loại vaccine:" name="date">
              <a-auto-complete
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
                :bordered="false"
                v-model:value="formState.doctorRecomend"
                :auto-size="{ minRows: 2, maxRows: 5 }"
              />
            </a-form-item>
            <a-form-item label="Ghi chú:" name="diagnose" style="height: 100px">
              <a-textarea
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
import { CloseOutlined } from '@ant-design/icons-vue'
import { useMedicalRecordStore } from '@/stores/medicalRecord'
import ListImageDrawer from '@/components/medical/ListImageDrawer.vue'
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

      this.listImg = response.data.data.image
      var obj = JSON.parse(response.data.data.contentMedical)
      this.dataSource = obj.drug == null ? '' : obj.drug
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
        type: 2,
        contentMedical: JSON.stringify(content),
        image: []
      }

      var id = this.$route.params.idD
      const mdStore = useMedicalRecordStore()
      var response = await mdStore.updateDP(id, obj)
      console.log(response)
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
