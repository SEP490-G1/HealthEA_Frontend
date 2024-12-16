<template>
  <div style="display: flex; align-items: center">
    <a-layout-content
      style="flex-direction: column; align-items: center; height: 100%"
      :style="{
        margin: 0,
        width: '1280px'
      }"
    >
      <div
        style="
          background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);

          width: 100%;
          height: 50vh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        "
      >
        <a-typography-title style="margin-left: 200px; color: aliceblue" :level="2"
          >{{ Title }}
        </a-typography-title>
      </div>
      <div style="width: 100%; display: flex; align-items: center; justify-content: center">
        <div style="width: 80%">
          <a-typography-title align="center" style="margin: 30px 0; color: black" :level="2"
            >Các chức năng chính
          </a-typography-title>
          <div class="card">
            <div class="right">
              <div>
                <a-typography-title style="margin: 30px 0" :level="3"
                  >Quản lý hồ sơ sức khỏe</a-typography-title
                >
                <a-typography
                  >Quản lý các hồ sơ sức khỏe cho một hoặc nhiều người, đưa ra chỉ dẫn phù hợp cũng
                  như hỗ trợ người dùng tra cứu các chỉ số với trí tuệ nhân tạo và thư viện hỗ
                  trợ</a-typography
                >
              </div>
              <a-button style="width: 350px; margin-bottom: 30px" size="large" type="primary"
                >Đến hồ sơ của bạn</a-button
              >
            </div>
            <div class="left">
              <div class="Image">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT51taHl0WJLBdzEVP8UR3sES3qFSo-5K-aFw&s"
                />
              </div>
            </div>
          </div>
          <div class="card">
            <div class="left">
              <div class="Image">
                <div class="Image">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCvmLZCmvx7c1PJg6i2oxdkr0ZdOF3t7l9Lw&s" />
                </div>
              </div>
            </div>
            <div class="right">
              <div>
                <a-typography-title style="margin: 30px 0" :level="3"
                  >Theo dõi chỉ số sức khỏe định kỳ</a-typography-title
                >
                <a-typography
                  >Hệ thống cung cấp biểu đồ và thống kê giúp người dùng theo dõi sự thay đổi các
                  chỉ số sức khỏe theo thời gian, từ đó đưa ra những gợi ý cải thiện phù hợp.
                </a-typography>
              </div>
              <a-button style="width: 350px; margin-bottom: 30px" size="large" type="primary"
                >Đến hồ sơ của bạn</a-button
              >
            </div>
          </div>
          <div class="card">
            <div class="right">
              <div>
                <a-typography-title style="margin: 30px 0" :level="3"
                  >Đặt lịch tư vấn y tế online</a-typography-title
                >
                <a-typography
                  >Tích hợp tính năng đặt lịch hẹn trực tuyến với các cơ sở y tế, cho phép người
                  dùng lựa chọn bác sĩ, thời gian và nhận nhắc nhở tự động.</a-typography
                >
              </div>
              <a-button style="width: 350px; margin-bottom: 30px" size="large" type="primary"
                >Đến hồ sơ của bạn</a-button
              >
            </div>
            <div class="left">
              <div class="Image">
                <img
                  src="https://imgchinhsachcuocsong.vnanet.vn/MediaUpload/Org/2023/11/16/121851-hn.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <a-typography-title
        style="display: flex; align-items: center; justify-content: center"
        :level="1"
      >
        Danh sách bác sĩ nổi bật
      </a-typography-title>
      <doctorList />
      <div style="background-color: #005bea; padding: 30px; color: white" align="center">
        Health EA 2024
      </div>
    </a-layout-content>
  </div>
</template>
<script>
import doctorList from '@/components/doctor/doctorList'
import { useUserStore } from '@/stores/user'
export default {
  components: {
    doctorList
  },
  mounted() {
    try {
      const store = useUserStore()
      var name = store.user.userFirstName + ' ' + store.user.userLastName
      let now = new Date()
      let hours = now.getHours()
      console.log('user', hours)
      var str = `Chào buổi sáng`
      if (hours > 12) {
        str = 'Chào buổi chiều'
      }
      if (hours > 18) {
        str = 'Chào buổi tối'
      }
      this.Title = `${str} ${name},`
    } catch {
      console.log('Chill day')
    }
  },
  data() {
    return {
      Title: 'Chào mừng bạn đến với Health EA'
    }
  }
}
</script>
<style scoped>
.card {
  background-color: white;
  height: 450px;
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  padding: 50px;
}
.card > .left {
  width: 50%;
  padding: 20px;
  box-sizing: border-box;
}
.card > .right {
  padding: 20px;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card .Image {
  background-color: gray;
  height: 100%;
  overflow: hidden;
  border-radius: 20px;
}
.Image > img {
  width: 100%;
}
</style>
