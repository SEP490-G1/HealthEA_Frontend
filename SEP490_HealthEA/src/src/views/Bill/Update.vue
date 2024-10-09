<template>
    <div style="margin-top: 100px;">
        <div class="container mt-4">
            <h3 class="text-center">Update bill</h3>
            <form @submit.prevent="updateBill">
                <div class="form-group row">
                    <label for="apartment" class="col-sm-2 col-form-label">Apartment</label>
                    <div class="col-sm-10">
                        <input list="unitNumbers" v-model="bill.apartmentUnitNum" class="form-control"
                            placeholder="Search Unit Number" @input="validateUnitNumber">
                        <datalist id="unitNumbers">
                            <option v-for="unit in unitNumbers" :key="unit" :value="unit"></option>
                        </datalist>
                        <small v-if="!isValidUnitNumber" class="text-danger">Please select a valid unit number in
                            list.</small>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="billType" class="col-sm-2 col-form-label">Bill Type</label>
                    <div class="col-sm-10">
                        <select class="form-control" v-model="bill.billType">
                            <option value="Electricity">Electricity</option>
                            <option value="Water">Water</option>
                            <option value="Service">Service</option>
                            <option value="Parking">Parking</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="usageAmount" class="col-sm-2 col-form-label">Usage Amount</label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control" v-model="bill.usageAmount">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="totalAmount" class="col-sm-2 col-form-label">Total Amount</label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control" v-model="bill.totalAmount">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="createdDate" class="col-sm-2 col-form-label">Created Date</label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" v-model="bill.createdDate">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="dueDate" class="col-sm-2 col-form-label">Due Date</label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" v-model="bill.dueDate">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="paymentStatus" class="col-sm-2 col-form-label">Payment Status</label>
                    <div class="col-sm-10">
                        <select class="form-control" v-model="bill.paymentStatus">
                            <option value="unpaid">Unpaid</option>
                            <option value="paid">Paid</option>
                            <option value="overdue">Overdue</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="note" class="col-sm-2 col-form-label">Note</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" v-model="bill.note"></textarea>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Save</button>&nbsp;
                <router-link to="/bill.list">
                    <button type="button" class="btn btn-primary">Back</button>
                </router-link>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            updatedId: '',
            unitNumbers: [],
            bill: {
                apartmentUnitNum: '',
                billType: '',
                usageAmount: 0,
                totalAmount: 0,
                createdDate: '',
                dueDate: '',
                paymentStatus: '',
                note: ''
            },
            isValidUnitNumber: true,
            isEditMode: false,
        }
    },
    created() {
        this.getAllUnitNumber();
        this.checkEditMode();
    },
    methods: {
        checkEditMode() {
            const updatedId = this.$route.params.id;
            if (updatedId) {
                this.getBillById(updatedId);
            }
        },
        getBillById(billId) {
            console.log("Get bill by ID")
            this.$request.get(`/billings/${billId}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                this.bill = res.data.result;
                this.bill.apartmentUnitNum = res.data.result.apartment.unitNumber
            }).catch(error => {
                if (error.response && error.response.data) {
                    alert("Error: " + error.response.data.message);
                } else {
                    alert("An unexpected error occurred");
                }
            });
        },
        updateBill() {
            const billId = this.$route.params.id;
            this.$request.put(`/billings/${billId}`, this.bill, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                this.$router.push({ name: 'bill.list' });
            }).catch(error => {
                if (error.response && error.response.data) {
                    alert("Error: " + error.response.data.message);
                } else {
                    alert("An unexpected error occurred");
                }
            });
        },
        getAllUnitNumber() {
            this.$request.get('/apartments/unitNumber', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                this.unitNumbers = res.data.result;
            }).catch(error => {
                if (error.response && error.response.data) {
                    alert("Error: " + error.response.data.message);
                } else {
                    alert("An unexpected error occurred");
                }
            });
        },
        validateUnitNumber() {
            this.isValidUnitNumber = this.unitNumbers.includes(this.bill.apartmentId);
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group label {
    font-weight: bold;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

input[type="text"],
input[type="number"],
textarea,
select,
input[type="date"] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

small.text-danger {
    color: red;
}
</style>
