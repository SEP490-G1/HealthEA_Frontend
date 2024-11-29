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
            <template v-if="['name', 'value', 'unit', 'result'].includes(column.dataIndex)">
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
import { useMedicalRecordStore } from '@/stores/medicalRecord'
import ListImageDrawer from '@/components/medical/ListImageDrawer.vue'
export default {
  components: {
    ListImageDrawer
  },
  mounted() {
    this.loadDate()
    this.stageEditor = true
  },

  methods: {
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
      this.listImg = response.data.data.image

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
        type: 3,
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
      listImg: ref([]),
      childrenDrawer: ref(false),
      open: ref(false),
      stageEditor: ref(true),
      formState: {
        title: 'Xét nghiệm',
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
