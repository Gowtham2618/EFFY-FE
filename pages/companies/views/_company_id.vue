<template>
    <div>
        <div class="row">
            <div class="col-md-8 col-sm-12">
                <h3 class="b">USERS LISTS</h3>
            </div>
        </div>
        <hr>
        <div class="row p-2">
            <div class="col-md-6 col-sm-12"></div>
            <div class="col-md-3 col-sm-12 text-end">
                <button type="button" class="btn btn-success" :disabled="this.showBtn" @click="showMigrationPopup()">Company
                    migration &nbsp;
                    <i class="bi bi-plus-circle w-100 h-100"></i></button>
            </div>
            <div class="col-md-2 col-sm-12 text-end">
                <button type="button" class="btn btn-primary" @click="goToUsers()">Create &nbsp;
                    <i class="bi bi-plus-circle w-100 h-100"></i></button>
            </div>
        </div>
        <div class="row p-4">
            <div class="col-md-12 col-sm-12">
                <vue-good-table :columns="columns" :rows="rows" @on-cell-click="onCellClick"
                    :pagination-options="paginationOptions" @on-selected-rows-change="selectionChanged"
                    :select-options="{ enabled: true }" :search-options="{ enabled: true, placeholder: 'Search users' }" />
            </div>
        </div>

        <div class="row">
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Delete Company</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <p>Are you sure you want to delete <b>{{ this.userName }}</b> !</p>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" @click.prevent="deleteUser()"><i
                                    class="bi bi-trash"></i>
                                &nbsp;Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="modal fade" id="companyModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">User Migration</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="col-md-12 col-sm-12">
                                <div>
                                    <label for="company" class="p-2">Select company</label>
                                    <multiselect v-model.trim="$v.company.$model" label="companyName" track-by="_id"
                                        :options="companyOptions" :searchable="true" :close-on-select="true"
                                        :show-labels="false" :class="{ 'form-group--error': $v.company.$error }"
                                        placeholder="Select company"></multiselect>
                                </div>
                                <div class="error" v-if="$v.company.$dirty">
                                    <p class="error-text p-1 ml-3" v-if="!$v.company.required">company is required</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-success saveBtn" @click.prevent="migrateUser()">
                                &nbsp;Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Vue from 'vue'
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
import { required, minLength, between } from 'vuelidate/lib/validators';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css'
export default {
    components: {
        VueGoodTable,
        Multiselect
    },
    data() {
        return {
            showBtn: true,
            usersLists: "",
            companyId: "",
            toastObj: {
                position: "top-right",
                timeout: 2000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            },
            columns: [
                {
                    label: 'S.No',
                    field: 'sno',
                },
                {
                    label: 'User Name',
                    field: 'userName',
                    type: 'string',
                },
                {
                    label: 'Email',
                    field: 'email',
                    type: 'string',
                },
                {
                    label: 'Date-of-birth',
                    field: 'dob',
                    type: 'string',
                },
                {
                    label: 'Designation',
                    field: 'designation',
                    type: 'string',
                },
                {
                    label: 'Action',
                    field: 'action',
                    html: true,
                },
            ],
            rows: [],
            paginationOptions: {
                enabled: true,
                perPage: 10,
                setCurrentPage: 1,
                // infoFn: (params) => `Showing ${params.lastRecordOnPage} to ${this.totalRecords} of page ${params.currentPage}`,
            },
            userName: "",
            userId: "",
            selectedUser: [],
            company: "",
            companyOptions: [],
            migratedCmpId: ""
        }
    },
    validations: {
        company: {
            required
        }
    },
    watch: {
        selectedUser: function (val) {
            console.log("VAL", val)
            if (val.length > 0) {
                this.showBtn = false;
            }
            else this.showBtn = true;
        },
        company: function (value) {
            this.migratedCmpId = value?._id ?? "";
        }
    },
    methods: {
        selectionChanged: function (val) {
            let { selectedRows } = val || [];
            if (selectedRows?.length > 0) {
                selectedRows?.map((item) => [
                    this.selectedUser.push(item.id)
                ]);
            }
            else this.selectedUser = [];
            this.getCompanies();
        },
        getUsersLists: async function () {
            await this.$axios.$get(`/api/v1/users?companyId=${this.companyId}`)
                .then((response) => {
                    let { data } = response || [];
                    this.totalRecords = response?.totalRecords ?? 0;
                    data.map((item, i) => {
                        this.rows.push({
                            sno: Number(i + 1), userName: `${item.firstName} ${item.lastName}`, email: item.email, id: item._id,
                            dob: item.dob, designation: item.designation,
                            action: `<span><i class="bi bi-pencil-square text-primary" id="edit"></i></span>&nbsp;
                <span><i class="bi bi-trash text-danger" id="delete"></i>`,
                        })
                    })
                }).catch((error) => {
                    console.log("ERR", error);
                });
        },

        showMigrationPopup: function () {
            $('#companyModal').modal('show');
        },

        goToUsers: function () {
            this.$nuxt.$router.push({ path: `/users/${this.companyId}` });
        },

        updateUser: function (userId) {
            this.$nuxt.$router.push({ path: `/users/edit/${userId}?companyId=${this.companyId}` });
        },

        deleteUser: async function () {
            await this.$axios.$delete(`/api/v1/users/${this.userId}`)
                .then((response) => {
                    let { data, message } = response;
                    $('#exampleModal').modal('hide');
                    this.$toast.success(message, this.toastObj);
                    setTimeout(() => {
                        this.rows = [];
                        this.getUsersLists();
                    }, 2000);
                }).catch((error) => {
                    this.$toast.error(error.message, this.toastObj);
                });
        },

        migrateUser: async function () {
            let migratedObj = {
                companyId: this.migratedCmpId,
                selectedUser: this.selectedUser
            }
            await this.$axios.$post(`/api/v1/users/migrateUser`, migratedObj)
                .then((response) => {
                    let { data, message } = response;
                    $('#companyModal').modal('hide');
                    this.$toast.success(message, this.toastObj);
                    setTimeout(() => {
                        this.rows = [];
                        this.getUsersLists();
                    }, 2000);
                }).catch((error) => {
                    this.$toast.error(error.message, this.toastObj);
                });
        },

        showDeletePopup: function () {
            $('#exampleModal').modal('show');
        },

        onCellClick: function (data) {
            let userId = data?.row.id;
            this.userId = userId;
            this.userName = data?.row?.userName;
            let { id } = data?.event?.target;
            switch (id) {
                case 'edit':
                    this.updateUser(userId)
                    break;
                case 'delete':
                    this.showDeletePopup();
                    break;
            }
        },
        getCompanies: async function () {
            await this.$axios.$get(`/api/v1/companies`)
                .then((response) => {
                    this.companyOptions = [];
                    let { data } = response?.data ?? [];
                    data.map((item) => {
                        this.companyOptions.push({ companyName: item.companyName, _id: item._id });
                        if (this.companyId === item._id) {
                            this.company = item;
                        }
                    });
                }).catch((error) => {
                    console.log("ERR", error);
                });
        },
    },

    mounted: function () {
        this.companyId = this.$route.params.company_id;
        this.getUsersLists();
    }
}
</script>