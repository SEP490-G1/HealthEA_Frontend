<template>
    <div style="margin-top: 100px;">
        <div class="container mt-4">
            <h2>Apartment</h2>
            <router-link to="/apartment.list">
                <button type="submit" class="btn btn-primary">Back</button>
            </router-link>

            <!-- tabs -->
            <ul class="nav nav-tabs">
                <li class="nav-item" @click="currentTab = 'apartment'">
                    <a class="nav-link" :class="{ active: currentTab === 'apartment' }" href="#">Apartment</a>
                </li>
                <li class="nav-item" @click="currentTab = 'resident'">
                    <a class="nav-link" :class="{ active: currentTab === 'resident' }" href="#">Resident</a>
                </li>
                <li class="nav-item" @click="currentTab = 'bill'">
                    <a class="nav-link" :class="{ active: currentTab === 'bill' }" href="#">Bill</a>
                </li>
            </ul>

            <!-- Content -->
            <div class="tab-content mt-3">
                <!-- Apartment -->
                <div v-if="currentTab === 'apartment'">
                    <h3>Apartment</h3>
                    <!-- <form>
                        <div class="mb-3">
                            <label for="apartmentName" class="form-label">Apartment Name</label>
                            <input type="text" class="form-control" id="apartmentName" v-model="apartment.name" />
                        </div>
                        <div class="mb-3">
                            <label for="apartmentLocation" class="form-label">Location</label>
                            <input type="text" class="form-control" id="apartmentLocation"
                                v-model="apartment.location" />
                        </div>
                        <div class="mb-3">
                            <label for="apartmentDescription" class="form-label">Description</label>
                            <textarea class="form-control" id="apartmentDescription"
                                v-model="apartment.description"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Save Apartment</button>
                    </form> -->
                </div>

                <!-- Resident -->
                <div v-if="currentTab === 'resident'">
                    <h3>Residents</h3>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" width="120">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">ID Card</th>
                                <th scope="col">Date of birth</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :key="index" v-for="(resident, index) in residents" :index="index">
                                <th scope="row">{{ index + 1 }}</th>
                                <td scope="row">{{ resident.name }}</td>
                                <td scope="row">{{ resident.email }}</td>
                                <td scope="row">{{ resident.phone }}</td>
                                <td scope="row">{{ resident.idCard }}</td>
                                <td scope="row">{{ resident.dob }}</td>
                                <td scope="row">{{ resident.gender ? 'Male' : 'Female' }}</td>
                                <td scope="row">{{ resident.status }}</td>
                                <td>
                                    <router-link :to="{ name: 'resident.update', params: { id: resident.residentId } }">
                                        <button class="btn btn-primary">Edit</button> &nbsp;
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Bill -->
                <div v-if="currentTab === 'bill'">
                    <h3>Bills</h3>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" width="120">#</th>
                                <th scope="col">Apartment</th>
                                <th scope="col">Bill Type</th>
                                <th scope="col">Usage Amount</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col">Created Date</th>
                                <th scope="col">Due Date</th>
                                <th scope="col">Payment Status</th>
                                <th scope="col">Note</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :key="index" v-for="(bill, index) in bills" :index="index">
                                <th scope="row">{{ index + 1 }}</th>
                                <td scope="row">{{ bill.apartment.unitNumber }}</td>
                                <td scope="row">{{ bill.billType }}</td>
                                <td scope="row">{{ bill.usageAmount }}</td>
                                <td scope="row">{{ bill.totalAmount }}</td>
                                <td scope="row">{{ bill.createdDate }}</td>
                                <td scope="row">{{ bill.dueDate }}</td>
                                <td scope="row">{{ bill.paymentStatus }}</td>
                                <td scope="row">{{ bill.note }}</td>
                                <td>
                                <router-link :to="{ name: 'bill.update', params: { id: bill.billingId } }">
                                    <button class="btn btn-primary">Edit</button> &nbsp;
                                </router-link>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            detailId: '',
            currentTab: 'apartment',
            apartments: [],
            residents: [],
            bills: [],
        };
    },
    created() {
        this.detailId = this.$route.params.id;
        this.getResidentInfor(),
            this.getBillInfor()
    },
    methods: {
        getResidentInfor() {
            console.log("Get residents infor")
            this.$request.get('/residents/getResidentByApartment/' + this.detailId, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                this.residents = res.data.result
            }).catch(error => {
                if (error.response && error.response.data) {
                    alert("Error: " + error.response.data.message);
                } else {
                    alert("An unexpected error occurred");
                }
            });
        },
        getBillInfor() {
            console.log("Get bills infor")
            this.$request.get('/billings/getBillByApartment/' + this.detailId, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                this.bills = res.data.result
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
h2 {
    margin-bottom: 20px;
    font-weight: 600;
}

.nav-tabs {
    margin-bottom: 20px;
}

.tab-pane {
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-label {
    font-weight: 600;
}

.container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

body {
    background-color: #007bff;
}

.btn-primary {
    background-color: #0056b3;
    border-color: #0056b3;
}

.btn-primary:hover {
    background-color: #004999;
    border-color: #004999;
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
</style>