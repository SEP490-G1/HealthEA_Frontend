<template>
    <div style="margin-top: 100px;">
        <div class="container mt-4">
            <h3 class="text-center">Update Apartment Information</h3>
            <form @submit.prevent="checkResidentAndBill">
                <div class="form-group row">
                    <label for="username" class="col-sm-2 col-form-label">Unit number</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="" v-model="apartment.unitNumber">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="firstName" class="col-sm-2 col-form-label">Floor</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="firstName" v-model="apartment.floor">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="lastName" class="col-sm-2 col-form-label">Area</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="lastName" v-model="apartment.area">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="email" class="col-sm-2 col-form-label">Number of rooms</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="email" v-model="apartment.numRoom">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="status" class="col-sm-2 col-form-label">Status</label>
                    <div class="col-sm-10">
                        <select class="form-control" id="status" v-model="apartment.status">
                            <option value="occupied">Occupied</option>
                            <option value="rented">Rented</option>
                            <option value="vacant">Vacant</option>
                            <option value="under_maintenance">Under maintenance</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="email" class="col-sm-2 col-form-label">Note</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="email" v-model="apartment.note">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Save</button>&nbsp;
                <router-link to="/apartment.list">
                    <button type="submit" class="btn btn-primary">Back</button>
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
            apartment: {
                id: '',
                buildingName: 'test',
                unitNumber: '',
                area: '',
                floor: '',
                numRoom: '',
                status: '',
                note: '',
            }
        }
    },
    created() {
        this.updatedId = this.$route.params.id;
        this.$request.get('/apartments/' + this.updatedId, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.apartment = res.data.result
            console.log(this.apartment)
        }).catch(error => {
            if (error.response && error.response.data) {
                alert("Error: " + error.response.data.message);
            } else {
                alert("An unexpected error occurred");
            }
        });
    },
    methods: {
        checkResidentAndBill() {
            console.log("Updating aparment");
            if (this.apartment.status == "vacant" || this.apartment.status == "under_maintenance") {
                // const response = this.$request.get(`/apartments/${apartmentId}/check-residents`);
                if (true) {
                    this.$swal({
                        title: 'Còn residents và bill chưa thanh toán trong căn hộ!',
                        text: 'Bạn có muốn cập nhật trạng thái tạm thời vắng mặt cho resident và cập nhật hóa đơn đã thanh toán không?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Có',
                        cancelButtonText: 'Không'
                    }).then(result => {
                        if (result.isConfirmed) {
                            // Call API to update resident status and bill
                            // this.$request.put(`/apartments/${apartmentId}/update-status`, {
                            //     residentStatus: 'temporary_absent',
                            //     billStatus: 'paid'
                            // }).then(() => {
                            //     this.$swal('Cập nhật thành công!', '', 'success');
                            // }).catch(err => {
                            //     this.$swal('Có lỗi xảy ra', err.message, 'error');
                            // });
                            this.updateApartment();
                        }
                    });
                }
            }
            
        },
        updateApartment(){
            this.$request.put('/apartments/' + this.updatedId, this.apartment, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                this.apartment = res.data.result
                console.log(this.apartment)
                this.$router.push({ name: 'apartment.list' });
            }).catch(error => {
                if (error.response && error.response.data) {
                    alert("Error: " + error.response.data.message);
                } else {
                    alert("An unexpected error occurred");
                }
            });
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
</style>