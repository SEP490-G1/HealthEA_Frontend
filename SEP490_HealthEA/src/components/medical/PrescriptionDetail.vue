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
    <div>
      <a-button style="width: 100%" type="dashed" @click="exportSave">Save</a-button>
    </div>
    <div class="ThePage">
      <div class="Content_ThePage">
        <a-typography-title :level="2">Đơn thuốc</a-typography-title>
        <div>
          <a-form
            :model="formState"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <a-form-item label="Ngày khám" name="date">
              <a-date-picker :bordered="false" v-model:value="formState.date" />
            </a-form-item>
            <a-form-item label="Chẩn đoán" name="diagnose">
              <a-input :bordered="false" v-model:value="formState.diagnose" />
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
  </div>
</template>
<script>
import { cloneDeep } from 'lodash-es'
import { reactive, ref } from 'vue'
import dayjs from 'dayjs'
export default {
  methods: {
    exportSave() {
      var content = {
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
      console.log(obj)
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
      const maxKey = this.dataSource.reduce((max, item) => Math.max(max, item.key), -Infinity)
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
  data() {
    return {
      formState: {
        date: dayjs('2002-04-14'),
        diagnose: '',
        doctorRecomend: '',
        doctor: ''
      },
      data: ref([
        {
          key: 1,
          name: 'Thuốc men',
          quantity: 1,
          dosage: 'uống, sáng 2 viên chiều 1 viên',
          unit: 'MG/kg'
        },
        {
          key: 2,
          name: 'Thuốc men',
          quantity: 1,
          dosage: 'uống, sáng 2 viên chiều 1 viên',
          unit: 'MG/kg'
        }
      ]),
      dataSource: ref([
        {
          key: 1,
          name: 'Thuốc men',
          quantity: 1,
          dosage: 'uống, sáng 2 viên chiều 1 viên',
          unit: 'MG/kg'
        },
        {
          key: 2,
          name: 'Thuốc men',
          quantity: 1,
          dosage: 'uống, sáng 2 viên chiều 1 viên',
          unit: 'MG/kg'
        }
      ]),
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
