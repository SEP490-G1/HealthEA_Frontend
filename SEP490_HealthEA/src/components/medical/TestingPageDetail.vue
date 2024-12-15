<script setup>
import chatDoccument from './chatDoccument.vue'
</script>
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
    <chatDoccument v-if="!editMode" :idDoc="$route.params.idD" />
    <div style="width: 100%; display: flex; margin: 10px; justify-content: space-between">
      <div></div>
      <div v-if="!editMode">
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
    <div style="margin: 0 100px">
      <div>
        <a-typography-title v-model:content="formState.title" :level="2" :editable="!editMode" />
        <a-button type="primary" @click="viewImage" style="margin-bottom: 40px; margin-top: 30px;" >Xem ảnh tài liệu </a-button>

        <div style="width: 100%">
          <a-form style="width: 100%" :model="formState" name="basic" autocomplete="off">
            <a-form-item label="Ngày khám:" name="date">
              <a-date-picker
                :bordered="false"
                v-model:value="formState.date"
                :disabled="editMode"
              />
            </a-form-item>
            <a-form-item label="Bác sĩ kê đơn:" name="date">
              <a-input :bordered="false" v-model:value="formState.doctor" :disabled="editMode" />
            </a-form-item>
            <a-form-item label="Lời khuyên bác sĩ:" name="date">
              <a-textarea
                :bordered="false"
                v-model:value="formState.doctorRecomend"
                :auto-size="{ minRows: 2, maxRows: 5 }"
                :disabled="editMode"
              />
            </a-form-item>
            <a-form-item label="Chẩn đoán:" name="diagnose" style="height: 100px">
              <a-textarea
                :bordered="false"
                v-model:value="formState.diagnose"
                :auto-size="{ minRows: 2, maxRows: 5 }"
                :disabled="editMode"
              />
            </a-form-item>
          </a-form>
        </div>
        <a-table :columns="columns" :data-source="dataSource" bordered>
          <template #bodyCell="{ column, text, record }">
            <template v-if="['name', 'value', 'unit', 'reference'].includes(column.dataIndex)">
              <div>
                <a-input
                  v-if="editableData[record.key]"
                  v-model:value="editableData[record.key][column.dataIndex]"
                  style="margin: -5px 0"
                />
                <template v-else>
                  {{
                    ['value', 'reference'].includes(column.dataIndex) && text != ''
                      ? checkTrueFalse(text)
                      : text
                  }}

                  <a-popover
                    title="Cảnh báo chỉ số"
                    v-if="
                      ['value'].includes(column.dataIndex) &&
                      checkIndex(checkTrueFalse(record.value), checkTrueFalse(record.reference))
                    "
                  >
                    <template #content>
                      {{
                        record.value == null
                          ? 'Bạn cần nhập chỉ số ở đây'
                          : description[record.name]
                            ? description[record.name].Warning
                            : 'Chỉ số ở mức nguy hiểm'
                      }}
                      <br />
                      <a-typography-text v-if="record.value != null" type="secondary">
                        Bạn có thể tư vấn bằng AI hoặc đặt lịch khám với bác sĩ để có thể biết thêm
                      </a-typography-text>
                    </template>
                    <WarningTwoTone two-tone-color="#FF0000" />
                  </a-popover>
                  <a-popover
                    :title="description[text].Title"
                    v-if="description[text] && ['name'].includes(column.dataIndex)"
                  >
                    <template #content>
                      <p style="width: 500px" v-html="description[text].Description"></p>
                    </template>
                    <InfoCircleOutlined />
                  </a-popover>
                </template>
              </div>
            </template>
            <template v-else-if="column.dataIndex === 'operation' && !editMode">
              <div class="editable-row-operations">
                <span v-if="editableData[record.key]">
                  <a-typography-link @click="save(record.key)">Save</a-typography-link>
                  <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
                    <a>Cancel</a>
                  </a-popconfirm>
                </span>
                <span v-else>
                  <a @click="edit(record.key)">Chỉnh sửa</a>
                  <a @click="remove(record.key)">Xóa</a>
                </span>
              </div>
            </template>
          </template>
        </a-table>
        <a-button v-if="!editMode" style="width: 100%" type="dashed" @click="add">Thêm chỉ số mới</a-button>
      </div>
    </div>
    <a-drawer v-model:open="open" style="color: black" :width="1000" title="Ảnh của tài liệu này">
      <template #extra>
        <a-button v-if="!editMode" type="primary" @click="onCloseChild">Thêm ảnh</a-button>
      </template>
      <ListImageDrawer v-model:listImg="listImg" />
    </a-drawer>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash-es'
import { reactive, ref } from 'vue'
import dayjs from 'dayjs'
import { InfoCircleOutlined, WarningTwoTone } from '@ant-design/icons-vue'
import { useMedicalRecordStore } from '@/stores/medicalRecord'
import ListImageDrawer from '@/components/medical/ListImageDrawer.vue'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores/user'
const valueIndex = {
  MCV: {
    Description:
      'Là chỉ số thể hiện kích thước trung bình của các tế bào hồng cầu trong máu. Nó cho biết hồng cầu của bạn có kích thước lớn, nhỏ hay bình thường.',
    Title: 'Thể tích trung bình hồng cầu (MCV)',
    Notice: '80 - 100 fL (femtoliter)',
    Warning:
      'Chỉ số nguy hiểm, cho thấy hồng cầu có kích thước nhỏ hơn bình thường, thường gặp trong các trường hợp thiếu máu do thiếu sắt hoặc các bệnh về tủy xương. '
  },
  HCT: {
    Description:
      'Là tỷ lệ phần trăm thể tích hồng cầu so với tổng thể tích máu. Chỉ số này cho biết phần trăm máu của bạn chứa các tế bào hồng cầu.',
    Title: 'Hematocrit',
    Notice: '13.5 - 17.5%',
    Warning: 'Chỉ số nguy hiểm, tình trạng mất nước, đa hồng cầu hoặc các bệnh về tim phổi. '
  },
  HB: {
    Description:
      'hay còn gọi là Hb là một loại protein đặc biệt có trong hồng cầu, đóng vai trò vô cùng quan trọng trong việc vận chuyển oxy từ phổi đến các tế bào trong cơ thể và vận chuyển khí carbon dioxide từ các tế bào trở lại phổi để thải ra ngoài.',
    Title: 'Huyết sắc tố (Hemoglobin)',
    Notice: 'Hệ số an toàn: 13.5 - 17.5 g/dL',
    Warning: 'Chỉ số nguy hiểm, bạn đang có thể bị thiếu máu, máu hồng cầu hình liềm... '
  },
  RBC: {
    Description:
      'là chỉ số đo lường số lượng hồng cầu trong máu. Đây là một trong ba tế bào máu bên cạnh bạch cầu, tiểu cầu và là tế bào máu có số lượng nhiều nhất. Hồng cầu được sản xuất ra trong tủy xương, nhờ huyết sắc tố trong hồng cầu mà máu có màu đỏ.',
    Title: 'RBC (tên đầy đủ là Red Blood Cell)',
    Notice: 'Hệ số an toàn: 4.32 - 5.72 Tera/L',
    Warning: 'Bạn đang có thể bị mất nước, bệnh về phổi hoặc tim hoặc đa hồng cầu'
  },
  LEU: {
    Description: 'Là dấu hiệu giúp phát hiện tình trạng nhiễm trùng đường niệu. ',
    Title: 'Chỉ số bạch cầu trong máu',
    Notice: 'Hệ số an toàn: âm tính hoặc',
    Warning: 'Bạn đang có thể bị nhiễm nấm hoặc nhiễm khuẩn'
  },
  NIT: {
    Description: 'Cho thấy tình trạng nhiễm khuẩn đường tiểu',
    Title: 'Nitrite - sản phẩm do vi khuẩn tạo ra',
    Notice:
      'Kết quả bình thường: Kết quả âm tính. Kết quả cao: NIT > 0.05 - 0.1 mg/dL thường do nhiễm trùng đường tiểu do chúng tạo ra loại enzyme chuyển hóa nitrat trong nước tiểu thành Nitrite.',
    Warning:
      'Bạn đang có thể bị nhiễm trùng nhiễm trùng đường tiểu do vi khuẩn tạo ra loại enzyme chuyển hóa nitrat trong nước tiểu thành Nitrite.'
  },
  MCH: {
    Description:
      'Là chỉ số thể hiện lượng huyết sắc tố trung bình có trong mỗi tế bào hồng cầu. Huyết sắc tố là một loại protein giúp hồng cầu vận chuyển oxy.',
    Title: 'Lượng huyết sắc tố trung bình trong hồng cầu (MCH)',
    Notice: '27 - 33 picogram (pg) trên mỗi tế bào',
    Warning:
      'cho thấy hồng cầu chứa ít huyết sắc tố hơn bình thường, thường gặp trong các bệnh như thiếu máu do thiếu sắt, hoặc b12, axitfolic'
  },
  'RDW-CV': {
    Description: 'Độ phân bố rộng của tế bào hồng cầu - Hệ số biến thiên.',
    Title: 'Độ phân bố rộng của tế bào hồng cầu',
    Notice: '11.9 - 14.3%',
    Warning: 'cho thấy thiếu máu tan máu, thiếu máu do thiếu B12 hoặc folate'
  },
  MCHC: {
    Description:
      'là một chỉ số xét nghiệm máu dùng để đo lượng hemoglobin trung bình có trong mỗi tế bào hồng cầu. Nói một cách đơn giản, nó cho biết mức độ đậm đặc của hemoglobin bên trong hồng cầu.',
    Title: 'MCHC (Mean Corpuscular Hemoglobin Concentration)',
    Notice: '32-36 g/dL',
    Warning:
      'MCHC giảm thường gặp trong các trường hợp thiếu máu do thiếu hemoglobin, điển hình là thiếu máu do thiếu sắt và thiếu máu tan máu, cũng như một số bệnh lý về gan và thận.'
  },
  'RDW-SD': {
    Description:
      ' là một chỉ số xét nghiệm máu dùng để đánh giá sự phân bố kích thước của các tế bào hồng cầu. Nói cách khác, nó cho biết các hồng cầu trong máu có kích thước đồng đều hay khác biệt nhau.',
    Title: 'RDW-SD (Red Cell Distribution Width - Standard Deviation)',
    Notice: '37-54',
    Warning:
      'Nguyên nhân làm tăng RDW-SD bao gồm sự sản xuất hồng cầu không đồng đều trong các loại thiếu máu (thiếu sắt, thiếu vitamin B12, folate), sự phá hủy hồng cầu nhanh chóng (tan máu) và một số bệnh lý khác như ung thư, bệnh thận và viêm nhiễm.'
  }
}

export default {
  components: {
    ListImageDrawer,
    InfoCircleOutlined,
    WarningTwoTone
  },
  mounted() {
    this.loadDate()
    this.stageEditor = true
  },

  methods: {
    isDouble(str) {
      const num = parseFloat(str)
      return !isNaN(num)
    },
    checkIndex(value, ref) {
      if (value == null) {
        return true
      }
      var array = ref.split('/')
      var res = false
      array.forEach((element) => {
        try {
          if (['dương tính', 'âm tính', 'negative', 'positive'].includes(value.toLowerCase())) {
            if (
              (value.toLowerCase() == 'positive' || value.toLowerCase() == 'dương Tính') &&
              (element.toLowerCase() == 'dương tính' || element.toLowerCase() == 'positive')
            ) {
              res = false
              return
            }
            if (
              (value.toLowerCase() == 'âm tính' || value.toLowerCase() == 'negative') &&
              (element.toLowerCase() == 'âm tính' || element.toLowerCase() == 'negative')
            ) {
              res = false
              return
            }
            if (
              element.includes('<') &&
              (value.toLowerCase() == 'âm tính' || value.toLowerCase() == 'negative')
            ) {
              res = false
              return
            }
            res = true
            return
          }
        } catch {
          console.log('skip')
        }
        try {
          if (this.isDouble(value)) {
            if (element.includes('-')) {
              let num = element.split('-')
              let val = parseFloat(value)
              let num1 = parseFloat(num[0])
              let num2 = parseFloat(num[1])
              if (num1 <= val && val <= num2) {
                res = false
                return
              }
              res = true
            }
            if (
              element.includes('<') ||
              element.includes('>') ||
              element.includes('<=') ||
              element.includes('>=')
            ) {
              let newStr = `${value} ${element}`
              if (newStr) {
                res = false
                return
              } else {
                res = true
                return
              }
            }
          }
        } catch {
          console.log('skip')
        }
      })

      return res
    },
    checkTrueFalse(test) {
      if (test == 0) {
        return ''
      }

      return test
    },
    add() {
      const maxKey = this.dataSource.reduce((max, item) => Math.max(max, item.key), 0)
      this.dataSource.push({
        key: maxKey + 1,
        name: '',
        value: 0,
        reference: '',
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
      this.editMode = !(isUser == response.data.data.userId.toLowerCase())
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
      message.success(response.data.userMsg)
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
        newValue
      },
      deep: true // This is crucial for watching nested changes
    }
  },
  data() {
    return {
      openChat: ref(false),
      editMode: ref(true),
      description: {
        RBC: valueIndex['RBC'],
        'Số lượng hồng cầu (RBC)': valueIndex['RBC'],
        'Leukocytes (LEU-BLO)': valueIndex['LEU'],
        Leukocytes: valueIndex['LEU'],
        BLO: valueIndex['LEU'],
        LEU: valueIndex['LEU'],
        'NIT (Nitrite)': valueIndex['NIT'],
        NIT: valueIndex['NIT'],
        Nitrite: valueIndex['NIT'],
        'Huyết sắc tố (Hb)': valueIndex['HB'],
        Hb: valueIndex['HB'],
        'Thể tích khối hồng cầu (HCT)': valueIndex['HCT'],
        HCT: valueIndex['HCT'],
        'Thể tích trung bình HC (MCV)': valueIndex['MCV'],
        MCV: valueIndex['MCV'],
        'Lượng Hb trung bình HC (MCH)': valueIndex['MCH'],
        MCH: valueIndex['MCH'],
        'Độ phân bố HC (RDW-CV)': valueIndex['RDW-CV'],
        'RDW-CV': valueIndex['RDW-CV'],
        MCHC: valueIndex['MCHC'],
        'Nồng độ Hb trung bình HC (MCHC)': valueIndex['MCHC'],
        'RDW-SD': valueIndex['RDW-SD'],
        'Độ phân bố HC (RDW-SD)': valueIndex['RDW-SD']
      },
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
          title: 'Khoảng bình thường',
          dataIndex: 'reference',
          key: 'reference',
          width: 200
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
