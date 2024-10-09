<template>
  <div class="user-list">
    <!-- Card to contain the title and the table -->
    <div class="user-management-card card-deck mb-3"
      style="margin: 80px 30px 0px 30px; justify-content: center; text-align: center;">
      <div class="pricing-header text-center">
        <h2 class="display-4">Apartment Management</h2>
        <p><router-link :to="{ name: 'apartment.create' }">Add new apartment</router-link></p>
      </div>

      <!-- Search user -->
      <div class="search-form container">
        <form @submit.prevent="searchApartments" class="form-inline justify-content-center">
          <div class="form-group mx-2">
            <input v-model="filters.unitNumber" type="text" placeholder="Unit Number" class="form-control">
          </div>
          <div class="form-group mx-2">
            <input v-model="filters.floor" type="text" placeholder="Floor" class="form-control">
          </div>
          <div class="form-group mx-2">
            <select v-model="filters.status" class="form-control">
              <option value="">Status</option>
              <option value="occupied">Occupied</option>
              <option value="rented">Rented</option>
              <option value="vacant">Vacant</option>
              <option value="under_maintenance">Under maintenance</option>
            </select>
          </div>
          <div class="form-group mx-2">
            <input v-model="filters.area" type="text" placeholder="Area" class="form-control">
          </div>
          <div class="form-group mx-2">
            <input v-model="filters.numRoom" type="text" placeholder="Number of Rooms" class="form-control">
          </div>
          <div class="form-group mx-2">
            <button type="submit" class="btn btn-primary">Search</button>
          </div>
        </form>
      </div>

      <!-- Table for user list -->
      <div class="container">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col" width="120">#</th>
              <th scope="col">Unit number</th>
              <th scope="col">Building</th>
              <th scope="col">Floor</th>
              <th scope="col">Area</th>
              <th scope="col">Rooms</th>
              <th scope="col">Status</th>
              <th scope="col">Note</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="index" v-for="(apartment, index) in apartments" :index="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ apartment.unitNumber }}</td>
              <td>{{ apartment.buildingName }}</td>
              <td>{{ apartment.floor }}</td>
              <td>{{ apartment.area }}</td>
              <td>{{ apartment.numRoom }}</td>
              <td>{{ apartment.status }}</td>
              <td>{{ apartment.note }}</td>
              <td v-if="this.permissionId === apartment.apartmentId || user.role.id === 1">
                <router-link :to="{ name: 'apartment.update', params: { id: apartment.apartmentId } }">
                  <button class="btn btn-primary">Edit</button> &nbsp;
                </router-link>
                <router-link :to="{ name: 'apartment.detail', params: { id: apartment.apartmentId } }">
                  <button class="btn btn-primary">Detail</button>
                </router-link>
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
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 0">Previous</button>
          <button v-for="page in totalPages" :key="page" @click="changePage(page - 1)"
            :class="{ active: currentPage === page - 1 }">
            {{ page }}
          </button>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages - 1">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ['user'],
  data() {
    return {
      apartments: [],
      filters: {
        unitNumber: '',
        floor: '',
        area: '',
        status: '',
        numRoom: ''
      },
      pageSizes: [5, 10, 15, 20],
      currentPage: 0,
      pageSize: 10,
      totalPages: 0,
      totalElements: 0,
      permissionId: '',
    };
  },
  created() {
    this.getTotal();
    this.getAllApartment();
    // verify user id qua contract => lấy apartment Id để hiện edit và detail
    this.verifyPermission();
  },
  methods: {
    getTotal() {
      this.$request.get('/apartments/total', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then(res => {
        this.totalElements = res.data.result
        this.totalPages = Math.ceil(this.totalElements / this.pageSize)
        console.log(this.totalElements)
      }).catch(error => {
        if (error.response && error.response.data) {
          alert("Error: " + error.response.data.message);
        } else {
          alert("An unexpected error occurred");
        }
      });
    },
    getAllApartment(page = this.currentPage, size = this.pageSize) {
      this.totalPages = Math.ceil(this.totalElements / this.pageSize)
      this.$request.get('/apartments', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }, params: {
          page: page,
          size: size
        }
      }).then(res => {
        this.apartments = res.data.result
      }).catch(error => {
        if (error.response && error.response.data) {
          alert("Error: " + error.response.data.message);
        } else {
          alert("An unexpected error occurred");
        }
      });
    },
    searchApartments() {
      this.$request.get('/apartments/search', {
        params: this.filters,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(res => {
          this.apartments = res.data.result;
        })
        .catch(error => {
          if (error.response && error.response.data) {
            alert("Error: " + error.response.data.message);
          } else {
            alert("An unexpected error occurred");
          }
        });
    },
    changePage(page) {
      this.currentPage = page;
      this.getAllApartment(page, this.pageSize);
    },
    verifyPermission() {
      this.$request.get('/contracts/getApartmentByUser/' + this.user.id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then(res => {
        this.permissionId = res.data.result
      }).catch(error => {
        if (error.response && error.response.data) {
          alert("Error: " + error.response.data.message);
        } else {
          alert("An unexpected error occurred");
        }
      });
    }
  }
};
</script>

<style scoped>
/* General styling for the container and card */
.user-management-card {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

.pricing-header {
  margin-bottom: 20px;
  padding: 20px;
  border-bottom: 1px solid #dee2e6;
  border-radius: 12px 12px 0 0;
  /* Top corners are rounded */
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

.table th[scope="col"] {
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
</style>