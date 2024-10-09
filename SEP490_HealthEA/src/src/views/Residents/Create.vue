<template>
    <div style="margin-top: 100px;">
        <div class="container mt-4">
            <h3 class="text-center">Create Resident</h3>
            <form @submit.prevent="createResident">
                <div class="form-group row">
                    <label for="username" class="col-sm-2 col-form-label">Apartment</label>
                    <div class="col-sm-10">
                        <input list="unitNumbers" v-model="resident.apartmentUnitNum" class="form-control"
                            placeholder="Search Unit Number" @input="validateUnitNumber">
                        <datalist id="unitNumbers">
                            <option v-for="unit in unitNumbers" :key="unit" :value="unit"></option>
                        </datalist>
                        <small v-if="!isValidUnitNumber" class="text-danger">Please select a valid unit number in
                            list.</small>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="firstName" class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="Full Name" v-model="resident.name">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="lastName" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="Email" v-model="resident.email">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="email" class="col-sm-2 col-form-label">Phone</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="phone" v-model="resident.phone">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="email" class="col-sm-2 col-form-label">ID card</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="phone" v-model="resident.idCard">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="email" class="col-sm-2 col-form-label">Date of birth</label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" id="phone" v-model="resident.dob">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="gender" class="col-sm-2 col-form-label">Gender</label>
                    <div class="col-sm-10">
                        <select class="form-control" id="gender" v-model="resident.gender">
                            <option value="true">Male</option>
                            <option value="false">Female</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="status" class="col-sm-2 col-form-label">Status</label>
                    <div class="col-sm-10">
                        <select class="form-control" id="status" v-model="resident.status">
                            <option value="current">Current</option>
                            <option value="former">Former</option>
                            <option value="temporary_absent">Temporary absent</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="username" class="col-sm-2 col-form-label">Username</label>
                    <div class="col-sm-10">
                        <input list="usernames" v-model="resident.username" class="form-control"
                            placeholder="Search Username" @input="validateUsername">
                        <datalist id="usernames">
                            <option v-for="user in usernames" :key="user" :value="user"></option>
                        </datalist>
                        <small v-if="!isValidUsername" class="text-danger">Please select a valid username in
                            list.</small>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Save</button>&nbsp;
                <router-link to="/resident.list">
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
            unitNumbers: [],
            usernames: [],
            resident: {
                name: '',
                email: '',
                phone: '',
                idCard: '',
                dob: '',
                gender: '',
                status: '',
                apartmentUnitNum: '',
                username: ''
            },
            isValidUnitNumber: true,
            isValidUsername: true,
        }
    },
    created() {
        this.getAllUnitNumber(),
            this.getAllUsername()
    },
    methods: {
        createResident() {
            console.log("Create residents");
            this.$request.post('/residents',
                this.resident,
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(res => {
                    console.log(res.data.result)
                    this.$router.push({ name: 'resident.list' });
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
                this.unitNumbers = res.data.result
            }).catch(error => {
                if (error.response && error.response.data) {
                    alert("Error: " + error.response.data.message);
                } else {
                    alert("An unexpected error occurred");
                }
            });
        },
        getAllUsername() {
            this.$request.get('/users/username', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                this.usernames = res.data.result
            }).catch(error => {
                if (error.response && error.response.data) {
                    alert("Error: " + error.response.data.message);
                } else {
                    alert("An unexpected error occurred");
                }
            });
        },
        validateUnitNumber() {
            if (this.unitNumbers.includes(this.resident.apartmentUnitNum)) {
                this.isValidUnitNumber = true;
            } else {
                this.isValidUnitNumber = false;
            }
        },
        validateUsername() {
            if (this.usernames.includes(this.resident.username)) {
                this.isValidUsername = true;
            } else {
                this.isValidUsername = false;
            }
        },
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

input[type="text"] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

datalist option {
    font-size: 16px;
    padding: 5px 10px;
    cursor: pointer;
}

input[type="text"]::placeholder {
    color: #aaa;
    font-style: italic;
}

.form-group {
    margin-bottom: 15px;
}

input[type="text"] {
    padding: 10px;
    font-size: 16px;
    width: 100%;
}

small.text-danger {
    color: red;
}
</style>