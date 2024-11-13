<template>
  <div style="display: flex; flex-direction: column">
    <a-button type="primary" style="margin: 10px" @click="onClose">Thêm mới</a-button>
    <a-collapse v-model:activeKey="activeKey" accordion>
      <a-collapse-panel
        v-for="(item, index) in sortByDateDesc(list)"
        :key="index"
        :header="convertHeader(item.date)"
      >
        <template #extra>
          <a-popconfirm
            title="Bạn có chắc muốn xóa dữ liệu này không!"
            ok-text="Đồng Ý"
            cancel-text="Hủy"
            @confirm="handleClick(item.id)"
          >
            <DeleteOutlined />
          </a-popconfirm>
        </template>
        <h1 style="margin: 10px">Cập nhật</h1>
        <a-form name="basic" autocomplete="off">
          <a-row>
            <a-col class="gutter-row" :span="6">
              <a-form-item label="Đường huyết" name="bloodSugar">
                <a-input-number style="width: 100%" v-model:value="item.bloodSugar" />
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="6"> </a-col>
            <a-col class="gutter-row" :span="6">
              <a-form-item label="Nhiệt độ cơ thể" name="bodyTemperature">
                <a-input-number style="width: 100%" v-model:value="item.bodyTemperature" />
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="6"> </a-col>
            <a-col class="gutter-row" :span="6">
              <a-form-item label="Huyết áp tâm thu" name="diastolicBloodPressure">
                <a-input-number style="width: 100%" v-model:value="item.diastolicBloodPressure" />
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="6"> </a-col>
            <a-col class="gutter-row" :span="6">
              <a-form-item label="Huyết áp tâm trương" name="systolicBloodPressure">
                <a-input-number style="width: 100%" v-model:value="item.systolicBloodPressure" />
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="6"> </a-col>
            <a-col class="gutter-row" :span="6">
              <a-form-item label="Chiều cao" name="height">
                <a-input-number style="width: 100%" v-model:value="item.height" />
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="6"> </a-col>
            <a-col class="gutter-row" :span="6">
              <a-form-item label="Cân nặng" name="weight">
                <a-input-number style="width: 100%" v-model:value="item.weight" />
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="6"> </a-col>
            <a-col class="gutter-row" :span="6">
              <a-form-item label="Nhịp tim" name="heartRate">
                <a-input-number style="width: 100%" v-model:value="item.heartRate" />
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="6"> </a-col>
            <a-col class="gutter-row" :span="6">
              <a-form-item label="Độ bão hòa oxy" name="oxygenSaturation">
                <a-input-number style="width: 100%" v-model:value="item.oxygenSaturation" />
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="24">
              <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" @click="onFinish(item)">Lưu lại</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-collapse-panel>
    </a-collapse>
    <a-drawer
      title="Thêm bộ chỉ số"
      :width="720"
      :open="open"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
      @finish="onFinishAdd"
      @finishFailed="onFinishAddFailed"
    >
      <a-form :model="formStage" name="basic" autocomplete="off">
        <a-row>
          <a-col :span="12">
            <a-form-item label="Ngày đo" name="date" style="width: 100%">
              <a-date-picker style="width: 100%" v-model:value="formStage.date" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width: 100%">
          <a-col class="gutter-row" :span="12">
            <a-form-item label="Cân nặng" name="weight" style="width: 100%">
              <a-input-number style="width: 100%" v-model:value="formStage.weight" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="12">
            <a-form-item label="Chiều cao" name="height" style="width: 100%">
              <a-input-number style="width: 100%" v-model:value="formStage.height" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="12">
            <a-form-item label="Tâm thu" name="systolicBloodPressure" style="width: 100%">
              <a-input-number style="width: 100%" v-model:value="formStage.systolicBloodPressure" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="12">
            <a-form-item label="Tâm trương" name="diastolicBloodPressure" style="width: 100%">
              <a-input-number
                style="width: 100%"
                v-model:value="formStage.diastolicBloodPressure"
              />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="12">
            <a-form-item label="Đường huyết" name="bloodSugar" style="width: 100%">
              <a-input-number style="width: 100%" v-model:value="formStage.bloodSugar" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="12">
            <a-form-item label="Nhịp tim" name="heartRate" style="width: 100%">
              <a-input-number style="width: 100%" v-model:value="formStage.heartRate" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="12">
            <a-form-item label="Nhiệt độ" name="bodyTemperature" style="width: 100%">
              <a-input-number style="width: 100%" v-model:value="formStage.bodyTemperature" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="12">
            <a-form-item label="Độ bão hòa oxy" name="oxygenSaturation" style="width: 100%">
              <a-input-number style="width: 100%" v-model:value="formStage.oxygenSaturation" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="24">
            <a-form-item>
              <a-button style="width: 100%" type="primary" html-type="submit">Lưu lại</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-drawer>
  </div>
</template>
<script>
import { message } from 'ant-design-vue'
import { ref, reactive } from 'vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { useDailyMetricStore } from '@/stores/DailyMetricView'
export default {
  components: {
    DeleteOutlined
  },
  props: {
    title: String,
    list: Array
  },
  data() {
    return {
      formStage: reactive({
        thuy: 'true'
      }),
      open: ref(false),
      activeKey: ref([])
    }
  },

  methods: {
    onClose() {
      this.open = !this.open
    },
    onFinish(value) {
      console.log('Cập nhật', value)
      const store = useDailyMetricStore()
      var obj = store.update(value)
      console.log('Kết quả', obj)
    },
    onFinishAdd(value) {
      console.log(value)
    },
    onFinishFailed() {
      message.error('Cập nhật thất bại', 3)
    },
    onFinishAddFailed(value) {
      console.log(value)
      message.error('Thêm thất bại', 3)
    },
    handleClick(id) {
      this.$emit('handleClickDelete', id)
    },
    removeElementById(array, id) {
      return array.filter((item) => item.id !== id)
    },
    convertHeader(data) {
      return 'Chỉ số của ngày: ' + data
    },
    sortByDateDesc(array) {
      if (array != null) {
        return array.sort((a, b) => {
          // So sánh ngày theo thứ tự giảm dần
          return new Date(b.date) - new Date(a.date)
        })
      }
      return array
    }
  }
}
</script>
<style scoped>
.gutter-box {
  background: #0092ff;
  padding: 8px 0;
}
</style>
