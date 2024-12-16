<script setup>
import { InfoCircleOutlined } from '@ant-design/icons-vue'
</script>
<template lang="">
  <div>
    <div v-if="author" align="end" style="margin-right: 100px">
      <a-button type="primary" @click="saveChange" :disabled="!change">Lưu thay đổi</a-button>
      <!-- <a-popconfirm
        title="Bạn có chắc muốn xóa tài liệu này?"
        @confirm="confirm"
        @cancel="cancelLolipop"
      >
        <a-button style="margin: 10px" type="primary" danger>Xóa</a-button>
      </a-popconfirm> -->
    </div>
    <div style="padding-left: 100px; padding-bottom: 100px; padding-top: 50px">
      <div style="display: flex; align-item: end">
        <a-typography-title :level="1" align="left">Tiền sử bệnh</a-typography-title>
        <a-popover title="Thông tin">
          <template #content>
            <p style="width: 500px">
              Dựa theo mẫu thông tin HỒ SƠ QUẢN LÝ SỨC KHỎE CÁ NHÂN PHỤC VỤ CHĂM SÓC SỨC KHỎE BAN
              ĐẦU của bộ y tế Số: 831/QĐ-BYT
            </p>
          </template>
          <InfoCircleOutlined />
        </a-popover>
      </div>
      <a-typography style="color: gray; font-size: 18px" align="left"
        >Lần cuối thay đổi {{ medicalDocument.lastModifyDate }}</a-typography
      >
      <a-button type="primary" style="margin-top: 10px" @click="changeView" v-if="author"
        >Chỉnh sửa tài liệu</a-button
      >
      <a-typography-title style="margin-top: 20px" :level="3"
        >I. Thông tin hành chính</a-typography-title
      >
      <a-typography-title :level="4" class="Title2">1. Thông tin chung</a-typography-title>
      <a-row>
        <a-col class="Truong" :span="12">
          <div>
            <div>Họ và tên:</div>
            <a-typography-paragraph
              v-model:content="formState.fullName"
              :editable="viewMode == '1'"
            />
          </div>
        </a-col>
        <a-col class="Truong" :span="12">
          <div>
            <div>Giới tính:</div>
            <a-typography-paragraph
              v-model:content="formState.gioitinh"
              :editable="viewMode == '1'"
            />
          </div>
        </a-col>
        <a-col class="Truong" :span="12">
          <div>
            <div>Nhóm máu:</div>
            <a-typography-paragraph
              v-model:content="formState.nhommau"
              :editable="viewMode == '1'"
            />
          </div>
        </a-col>
        <a-col class="Truong" :span="12"
          ><div>
            <div>Hệ Rh:</div>
            <a-typography-paragraph
              v-model:content="formState.rh"
              :editable="viewMode == '1'"
            /></div
        ></a-col>
        <a-col class="Truong" :span="12">
          <div>
            <div>Ngày Sinh:</div>
            <a-typography-paragraph
              v-model:content="formState.dob"
              :editable="viewMode == '1'"
            /></div></a-col
        ><a-col class="Truong" :span="12">
          <div>
            <div>Nơi đăng ký khai sinh::</div>
            <a-typography-paragraph
              v-model:content="formState.placeborn"
              :editable="viewMode == '1'"
            /></div
        ></a-col>
        <a-col class="Truong" :span="6">
          <div>
            <div>Nghề nghiệp:</div>
            <a-typography-paragraph v-model:content="formState.job" :editable="viewMode == '1'" />
          </div>
        </a-col>
        <a-col class="Truong" :span="6"
          ><div>
            <div>Dân tộc:</div>
            <a-typography-paragraph
              v-model:content="formState.dantoc"
              :editable="viewMode == '1'"
            /></div
        ></a-col>
        <a-col class="Truong" :span="6"
          ><div>
            <div>Quốc tịch:</div>
            <a-typography-paragraph
              v-model:content="formState.nation"
              :editable="viewMode == '1'"
            /></div
        ></a-col>
        <a-col class="Truong" :span="6"
          ><div>
            <div>Tôn giáo:</div>
            <a-typography-paragraph
              v-model:content="formState.tongiao"
              :editable="viewMode == '1'"
            />
          </div>
        </a-col>
      </a-row>
      <a-typography-title class="Title2" :level="4"
        >2.Thông tin liên hệ khi khẩn cấp</a-typography-title
      >
      <div v-for="(item, index) in formState.listContact" :key="index">
        <div style="display: flex; align-item: center">
          <a-typography-title :level="5">Liên hệ {{ index + 1 }}:</a-typography-title>
        </div>
        <a-row>
          <a-col class="Truong" :span="5">
            <div>
              <div>Họ và tên:</div>
              <a-typography-paragraph v-model:content="item.fullName" :editable="viewMode == '1'" />
            </div>
          </a-col>
          <a-col class="Truong" :span="5">
            <div>
              <div>Quan hệ với hồ sơ:</div>
              <a-typography-paragraph v-model:content="item.qh" :editable="viewMode == '1'" />
            </div>
          </a-col>
          <a-col class="Truong" :span="5">
            <div>
              <div>Email:</div>
              <a-typography-paragraph
                v-model:content="item.email"
                :editable="viewMode == '1'"
              /></div
          ></a-col>
          <a-col class="Truong" :span="5">
            <div>
              <div>Điện thoại:</div>
              <a-typography-paragraph v-model:content="item.phone" :editable="viewMode == '1'" />
            </div>
          </a-col>
          <a-button type="text" danger v-if="viewMode" @click="removeContact(index)"
            >Xóa liên hệ</a-button
          >
        </a-row>
      </div>
      <a-button
        style="width: 90%; margin-top: 20px"
        v-if="viewMode == 1"
        size="large"
        type="dashed"
        @click="addContact"
        >Thêm liên hệ</a-button
      >
      <a-typography-title class="Title" :level="3">
        II. Thông tin tiền sử và các yếu tố liên quan đến sức khỏe
      </a-typography-title>
      <a-typography-title :level="4">1.Tình trạng lúc mới sinh</a-typography-title>
      <a-row>
        <a-col class="Truong" :span="6"
          ><div>
            <div>Kiểu đẻ:</div>
            <div v-if="!viewMode">
              <b>{{ formState.cachde }}</b>
            </div>
            <a-radio-group v-if="viewMode" v-model:value="formState.cachde">
              <a-radio-button value="Không rõ">Không rõ</a-radio-button>
              <a-radio-button value="Đẻ mổ">Đẻ mổ</a-radio-button>
              <a-radio-button value="Để thường">Đẻ thường</a-radio-button>
            </a-radio-group>
          </div>
        </a-col>

        <a-col class="Truong" :span="6">
          <div>
            <div>Đẻ thiếu tháng:</div>
            <div style="display: flex; align-items: center">
              <a-checkbox v-if="viewMode" v-model:checked="formState.thieuthang" />
              <div style="margin-left: 10px">
                <div v-if="formState.thieuthang"><b>Có</b></div>
                <div v-if="!formState.thieuthang"><b>Không</b></div>
              </div>
            </div>
          </div>
        </a-col>
        <a-col class="Truong" :span="6">
          <div>
            <div>Bị ngạt lúc đẻ:</div>
            <div style="display: flex; align-items: center">
              <a-checkbox v-if="viewMode" v-model:checked="formState.ngat" />
              <div style="margin-left: 10px">
                <div v-if="formState.ngat"><b>Có</b></div>
                <div v-if="!formState.ngat"><b>Không</b></div>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="Truong" :span="6"
          ><div>
            <div>Cân nặng lúc đẻ:</div>
            <a-typography-paragraph
              v-model:content="formState.cannang"
              :editable="viewMode == '1'"
            />
          </div>
          gr </a-col
        ><a-col class="Truong" :span="6"
          ><div>
            <div>Chiều dài lúc đẻ:</div>
            <a-typography-paragraph
              v-model:content="formState.chieudai"
              :editable="viewMode == '1'"
            />
          </div>
          cm
        </a-col>
        <a-col class="Truong" :span="24"
          ><div>
            <div>Dị tật bẩm sinh:</div>
            <a-typography-paragraph v-model:content="formState.ditat" :editable="viewMode == '1'" />
          </div>
        </a-col>
        <a-col class="Truong" :span="24"
          ><div>
            <div>Vấn đề khác:</div>
            <a-typography-paragraph v-model:content="formState.vande" :editable="viewMode == '1'" />
          </div>
        </a-col> </a-row
      ><a-typography-title :level="4">2.Yếu tố liên quan tới sức khỏe</a-typography-title>
      <a-row>
        <a-col class="Truong" :span="6"
          ><div>
            <div>Hút thuốc:</div>
            <div v-if="!viewMode">
              <b>{{ formState.hutthuoc }}</b>
            </div>
            <a-radio-group v-if="viewMode" v-model:value="formState.hutthuoc">
              <a-radio-button value="Không hút">Không hút</a-radio-button>
              <a-radio-button value="Thuốc lá">Thuốc lá</a-radio-button>
              <a-radio-button value="Thuốc lào">Thuốc lào</a-radio-button>
            </a-radio-group>
          </div>
        </a-col>
        <a-col class="Truong" :span="13"
          ><div>
            <div>Tần suất hút thuốc:</div>
            <div v-if="!viewMode">
              <b>{{ formState.tansuathutthuoc }}</b>
            </div>
            <a-radio-group v-if="viewMode" v-model:value="formState.tansuathutthuoc">
              <a-radio-button value="Chưa bao giờ">Chưa bao giờ</a-radio-button>
              <a-radio-button value="Thi thoảng (1 lần/tuần)"
                >Thi thoảng (1 lần/tuần)</a-radio-button
              >

              <a-radio-button value="Thường xuyên (1 lần/ngày)"
                >Thường xuyên (1 lần/ngày)</a-radio-button
              >
              <a-radio-button value="Nhiều (2 - 3 lần/ngày)">Nhiều (2 - 3 lần/ngày)</a-radio-button>
            </a-radio-group>
          </div>
        </a-col>
        <a-col class="Truong" :span="5">
          <div>
            <div>Đã bỏ:</div>
            <div style="display: flex; align-items: center">
              <a-checkbox v-if="viewMode" v-model:checked="formState.bothuoc" />
              <div style="margin-left: 10px">
                <div v-if="formState.bothuoc"><b>Đã bỏ</b></div>
                <div v-if="!formState.bothuoc"><b>Chưa</b></div>
              </div>
            </div>
          </div>
        </a-col>
        <a-col class="Truong" :span="6"
          ><div>
            <div>Tần suất uống rượu bia:</div>
            <div v-if="!viewMode">
              <b>{{ formState.ruoubia }}</b>
            </div>
            <a-radio-group v-if="viewMode" v-model:value="formState.ruoubia">
              <a-radio-button value="Không hút">Không uống</a-radio-button>
              <a-radio-button value="Có uống">Có uống</a-radio-button>
            </a-radio-group>
          </div>
        </a-col>
        <a-col class="Truong" :span="13"
          ><div>
            <div>Tần suất sử dụng:</div>
            <div v-if="!viewMode">
              <b>{{ formState.tansuatruoubia }}</b>
            </div>
            <a-radio-group v-if="viewMode" v-model:value="formState.tansuatruoubia">
              <a-radio-button value="Chưa bao giờ">Chưa bao giờ</a-radio-button>
              <a-radio-button value="Thi thoảng (1 lần/tuần)"
                >Thi thoảng (1 lần/tuần)</a-radio-button
              >

              <a-radio-button value="Thường xuyên (1 lần/ngày)"
                >Thường xuyên (1 lần/ngày)</a-radio-button
              >
            </a-radio-group>
          </div>
          <a-col class="Truong" :span="5">
            <div>
              <div>Đã bỏ:</div>
              <div style="display: flex; align-items: center">
                <a-checkbox v-if="viewMode" v-model:checked="formState.boruou" />
                <div style="margin-left: 10px">
                  <div v-if="formState.boruou"><b>Đã bỏ</b></div>
                  <div v-if="!formState.boruous"><b>Chưa</b></div>
                </div>
              </div>
            </div>
          </a-col>
        </a-col>
        <a-col class="Truong" :span="6"
          ><div>
            <div>Sử dụng ma túy:</div>
            <div v-if="!viewMode">
              <b>{{ formState.matuy }}</b>
            </div>
            <a-radio-group v-if="viewMode" v-model:value="formState.matuy">
              <a-radio-button value="Không hút">Không sử dụng</a-radio-button>
              <a-radio-button value="Có uống">Sử dụng</a-radio-button>
            </a-radio-group>
          </div>
        </a-col>
        <a-col class="Truong" :span="13"
          ><div>
            <div>Tần suất sử dụng:</div>
            <div v-if="!viewMode">
              <b>{{ formState.tansuatmatuy }}</b>
            </div>
            <a-radio-group v-if="viewMode" v-model:value="formState.tansuatmatuy">
              <a-radio-button value="Chưa bao giờ">Chưa bao giờ</a-radio-button>
              <a-radio-button value="Thi thoảng (1 lần/tuần)"
                >Thi thoảng (1 lần/tuần)</a-radio-button
              >

              <a-radio-button value="Thường xuyên (1 lần/ngày)"
                >Thường xuyên (1 lần/ngày)</a-radio-button
              >
              <a-radio-button value="Nhiều (2 - 3 lần/ngày)">Nhiều (2 - 3 lần/ngày)</a-radio-button>
            </a-radio-group>
          </div>
        </a-col>
        <a-col class="Truong" :span="5">
          <div>
            <div>Đã bỏ:</div>
            <div style="display: flex; align-items: center">
              <a-checkbox v-if="viewMode" v-model:checked="formState.bomatuy" />
              <div style="margin-left: 10px">
                <div v-if="formState.bomatuy"><b>Đã bỏ</b></div>
                <div v-if="!formState.bomatuy"><b>Chưa</b></div>
              </div>
            </div>
          </div> </a-col
        ><a-col class="Truong" :span="6"
          ><div>
            <div>Hoạt động thể lực:</div>
            <div v-if="!viewMode">
              <b>{{ formState.matuy }}</b>
            </div>
            <div style="display: flex; align-items: center">
              <a-checkbox v-if="viewMode" v-model:checked="formState.hoatdong" />
              <div style="margin-left: 10px">
                <div v-if="formState.hoatdong"><b>Có</b></div>
                <div v-if="!formState.hoatdong"><b>Không</b></div>
              </div>
            </div>
          </div>
        </a-col>
        <a-col class="Truong" :span="13"
          ><div>
            <div>Tần suất (tập luyện làm việc):</div>
            <div v-if="!viewMode">
              <b>{{ formState.tansuathoatdong }}</b>
            </div>
            <a-radio-group v-if="viewMode" v-model:value="formState.tansuathoatdong">
              <a-radio-button value="Ít khi">Ít khi</a-radio-button>
              <a-radio-button value="Thi thoảng (1 lần/tuần)"
                >Thi thoảng (1 lần/tuần)</a-radio-button
              >

              <a-radio-button value="Thường xuyên (2 - 3 lần/tuần)"
                >Thường xuyên (2 - 3 lần/tuần)</a-radio-button
              >
              <a-radio-button value="Nhiều (1 lần/ngày)">Nhiều (1 lần/ngày)</a-radio-button>
            </a-radio-group>
          </div> </a-col
        ><a-col class="Truong" :span="24"
          ><div>
            <div>
              Yếu tố tiếp xúc nghề nghiệp/ Môi trường sống (Hóa chất, bụi, ồn, virút,....) ghi rõ
              yếu tố tiếp xúc:
            </div>
            <a-typography-paragraph
              v-model:content="formState.yeutonghenghiep"
              :editable="viewMode == '1'"
            />
          </div>
        </a-col>
        <a-col class="Truong" :span="13"
          ><div>
            <div>Tần suất tiếp xúc:</div>
            <div v-if="!viewMode">
              <b>{{ formState.tansuatyeutonghenghiep }}</b>
            </div>
            <a-radio-group v-if="viewMode" v-model:value="formState.tansuatyeutonghenghiep">
              <a-radio-button value="Ít khi">Ít khi</a-radio-button>
              <a-radio-button value="Thi thoảng (1 lần/tuần)"
                >Thi thoảng (1 lần/tuần)</a-radio-button
              >

              <a-radio-button value="Thường xuyên (2 - 3 lần/tuần)"
                >Thường xuyên (2 - 3 lần/tuần)</a-radio-button
              >
              <a-radio-button value="Nhiều (1 lần/ngày)">Nhiều (1 lần/ngày)</a-radio-button>
            </a-radio-group>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import { useMedicalRecordStore } from '@/stores/medicalRecord'
import { ref } from 'vue'
import dayjs from 'dayjs'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'

export default {
  components: {
    InfoCircleOutlined
  },
  watch: {
    formState: {
      handler() {
        this.change = true
      },
      deep: true // This is crucial for watching nested changes
    }
  },
  data() {
    return {
      change: ref(false),
      idHP: this.$route.params.id,
      formState: ref({
        listContact: [{ fullname: '', phone: '', email: '', qh: '' }]
      }),
      author: ref(false),
      customStyle: 'background: #f7f7f7;border-radius: 4px;border: 0;overflow: hidden',
      viewMode: ref('0'),
      medicalDocument: ref({})
      //1 edit, 0 view
    }
  },
  mounted() {
    this.loadData()
    this.viewMode = '0'
  },
  methods: {
    async saveChange() {
      console.log(this.formState)
      const store = useMedicalRecordStore()
      let obj = {
        image: [],
        type: 4,
        healthProfileId: this.idHP,
        contentMedical: JSON.stringify(this.formState)
      }
      let response = await store.updateDP(this.medicalDocument.id, obj)
      console.log(response)
      message.success('Lưu thay đổi thành công')
      this.change = false
    },
    addContact() {
      this.formState.listContact.push({ fullname: '', phone: '', email: '', qh: '' })
    },
    removeContact(index) {
      this.formState.listContact.splice(index, 1)
    },
    formatDate() {
      this.medicalDocument.lastModifyDate = dayjs(this.medicalDocument.lastModifyDate).format(
        'HH:mm:ss DD/MM/YYYY'
      )
    },
    async loadData() {
      const store = useMedicalRecordStore()
      var response = await store.getListAType(this.idHP, 4)
      if (response.data) var list = response.data.data
      if (list.length <= 0) {
        var obj = {
          image: [],
          type: 4,
          healthProfileId: this.idHP,
          contentMedical: '{}'
        }
        store.addNewDP(obj)
        response = await store.getListAType(this.idHP, 4)
        list = response.data.data
      }
      const storeUser = useUserStore()
      let isUser = null
      try {
        isUser = storeUser.user.id.toLowerCase()
      } catch {
        console.log('chill guy')
      }
      this.author = list[0].userId == isUser
      this.medicalDocument = list[0]
      this.formState = JSON.parse(this.medicalDocument.contentMedical)
      console.log(this.formState)
      this.formatDate()
      this.change = await false
      this.viewMode = '0'
    },
    changeView() {
      this.viewMode = this.viewMode == '1' ? '0' : '1'
    }
  }
}
</script>
<style scoped>
.output-group {
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 20px;
  padding: 20px;
  margin: 200px;
  margin-top: 30px;
}
.Title {
  padding-top: 30px;
}
.Title2 {
  padding-top: 10px;
  padding-bottom: 20px;
}
.Truong {
  display: flex;
}
.Truong > div {
  display: flex;
  margin-bottom: 20px;
}
.Truong > div > div {
  margin-right: 20px;
}
.colap .ant-collapse-header-text {
  background-color: aquamarine;
}
</style>
