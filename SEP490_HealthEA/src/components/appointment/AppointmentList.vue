<!-- <template>
  <div class="pricing-header text-center">
    <h2 class="display-4">Danh sách cuộc hẹn</h2>
  </div>

  <!-- Table for appointment list -->
  <div class="container">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col" width="120">#</th>
          <th scope="col">Chủ đề</th>
          <th scope="col">Nội dung</th>
          <th scope="col">Ngày</th>
          <th scope="col">Giờ</th>
          <th scope="col">Địa điểm</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Hành động</th>
          <th scope="col">Call</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="index" v-for="(appointment, index) in appointments" :index="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ appointment.title }}</td>
          <td>{{ appointment.description }}</td>
          <td>{{ appointment.date }}</td>
          <td>{{ appointment.startTime }} - {{ appointment.endTime }}</td>
          <td>{{ appointment.location }}</td>
          <td>{{ appointment.status }}</td>
          <td>
            <!-- <router-link :to="{ name: 'updateUser', params: { id: appointment.appointmentId } }"> -->
            <button class="btn btn-primary" @click="approveAppointment(appointment.appointmentId)">
              Đồng ý
            </button>
            <button class="btn btn-primary" @click="rejectAppointment(appointment.appointmentId)">
              Từ chối
            </button>
            <!-- </router-link> -->
          </td>
          <td>
            <button class="btn btn-success" @click="callAppointment(appointment)">
              Call
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="pagination-container">
    <div class="page-size-selector">
      <label for="pageSize">Page Size:</label> &nbsp;
      <select v-model="pageSize" @change="getAllUser(0, pageSize)">
        <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
      </select>
    </div>

    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 0">Trước</button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page - 1)"
        :class="{ active: currentPage === page - 1 }"
      >
        {{ currentPage }}
      </button>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages - 1">
        Sau
      </button>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'
import axios from 'axios'

export default {
  data() {
    return {
      appointments: [],
      pageSizes: [5, 10, 15, 20],
      currentPage: 1,
      pageSize: 10,
      totalPages: 0,
      totalElements: 10,
      userId: 0
    }
  },
  async mounted() {
    try {
      await this.getUserId()
      await this.getAppointment(1, 10)
      console.log(this.info)
      this.loading = false
    } catch (error) {
      console.error('Error fetching data:', error)
      message.error('Error:' + error, 3)
    }
  },
  methods: {
    async getUserId() {
      const userStore = useUserStore()
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userStore.token}`
        }
      }
      const user = await axios.get('http://160.25.233.36:9090/identity/users/myinfo', headers)
      this.userId = user.data.result.id
    },
    async getAppointment(page = this.currentPage, size = this.pageSize) {
      this.totalPages = Math.ceil(this.totalElements / this.pageSize)
      try {
        const bodyParameter = {
          page: page,
          size: size
        }
        const userStore = useUserStore()
        const response = await axios.get(
          'http://localhost:5217/api/Appointments' +
            '?pageNumber=' +
            this.currentPage +
            '&pageSize=' +
            this.pageSize,
          {
            headers: {
              Authorization: `Bearer ${userStore.token}`
            }
          }
        )
        this.appointments = response.data.items
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    changePage(page) {
      this.currentPage = page
      this.getAppointment(page, this.pageSize)
    },
    async approveAppointment(id) {
      console.log(id)
      const userStore = useUserStore()
      const bodyParameter = {
        appointmentId: id
      }
      const response = await axios.post(
        'http://localhost:5217/api/Appointments/approve/' + id,
        bodyParameter,
        {
          headers: {
            Authorization: `Bearer ${userStore.token}`
          }
        }
      )
      console.log(response.data.message)
      alert(response.data.message)
      this.getAppointment(this.page, this.pageSize)
    },
    async rejectAppointment(id) {
      console.log(id)
      const bodyParameter = {
        appointmentId: id
      }
      const userStore = useUserStore()
      const response = await axios.post(
        'http://localhost:5217/api/Appointments/reject/' + id,
        bodyParameter
      )
      console.log(response.data.message)
      alert(response.data.message)
      this.getAppointment(this.page, this.pageSize)
    }
  }
}
</script>

<style scoped>
.search-form {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin: 20px 0;
}

.form-group {
  flex: 1;
  min-width: 150px;
  margin-bottom: 0;
}

.form-group select,
.form-group input {
  width: 100%;
}

.btn-primary {
  margin-left: 15px;
}

.container {
  max-width: 100%;
  overflow-x: auto;
}

.pricing-header {
  margin-bottom: 20px;
  padding: 20px;
  border-bottom: 1px solid #dee2e6;
  border-radius: 12px 12px 0 0;
}

.pricing-header h2 {
  font-size: 32px;
  font-weight: 700;
  color: #343a40;
}

.pricing-header p {
  margin-top: 10px;
  font-size: 14px;
  color: #6c757d;
}

.table {
  width: 100%;
  max-width: 100%;
  background-color: white;
  margin-top: 0;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  border-radius: 0 0 12px 12px;
}

.table th,
.table td {
  text-align: left;
  padding: 12px;
  vertical-align: middle;
  border: none;
}

.table th {
  font-weight: 600;
  font-size: 14px;
  color: #6c757d;
  border-bottom: 2px solid #dee2e6;
}

.table td {
  font-size: 14px;
  color: #495057;
  background-color: white;
  border-bottom: 1px solid #dee2e6;
  border-radius: 8px;
}

.table tr {
  transition: all 0.3s ease-in-out;
}

.table tr:hover {
  background-color: #f8f9fa;
}

.table .btn {
  padding: 6px 12px;
  font-size: 12px;
}

.table .btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.table .btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.table .checkbox-cell {
  text-align: center;
  width: 50px;
}

.container {
  max-width: 95%;
}

th,
td {
  text-align: left;
  white-space: nowrap;
}

.table .table-bordered {
  border: 1px solid #dee2e6;
}

.table th[scope='col'] {
  background-color: #f4f6f9;
  font-weight: 600;
}

.search-form {
  margin: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.user-list {
  margin-top: 20px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.page-size-selector {
  margin-right: 20px;
}

.pagination {
  display: flex;
  list-style: none;
  padding: 0;
}

.pagination li {
  margin: 0 5px;
}

.pagination li button {
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.pagination li.disabled button {
  background-color: #d6d6d6;
  cursor: not-allowed;
}

.pagination li.active button {
  background-color: #0056b3;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
}

.pagination .active {
  background-color: #007bff;
  color: white;
}
</style> -->
