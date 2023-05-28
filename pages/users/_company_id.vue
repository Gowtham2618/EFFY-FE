<template>
    <div>
        <div class="row p-4">
            <div class="col-md-8 col-sm-12">
                <h3 class="b">CREATE USERS</h3>
            </div>
        </div>
        <hr>
        <div class="row p-4">
            <div class="col-md-2 col-sm-12"></div>
            <div class="col-md-4 col-sm-12">
                <div class="input-group">
                    <input type="text" class="form-control p-2" v-model.trim="$v.firstName.$model"
                        :class="{ 'form-group--error': $v.firstName.$error }" placeholder="First Name"
                        aria-label="Username">
                </div>
                <div class="error" v-if="$v.firstName.$dirty">
                    <p class="error-text p-1 ml-3" v-if="!$v.firstName.required">first name is required</p>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="input-group">
                    <input type="text" class="form-control p-2" v-model.trim="$v.lastName.$model"
                        :class="{ 'form-group--error': $v.lastName.$error }" placeholder="Last Name" aria-label="Username">
                </div>
                <div class="error" v-if="$v.lastName.$dirty">
                    <p class="error-text p-1 ml-3" v-if="!$v.lastName.required">last name is required</p>
                </div>
            </div>
        </div>
        <div class="row p-4">
            <div class="col-md-2 col-sm-12"></div>
            <div class="col-md-8 col-sm-12">
                <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                    <input type="email" class="form-control p-2" v-model="$v.email.$model" placeholder="Email"
                        :class="{ 'form-group--error': $v.email.$error }" aria-label="Username">
                </div>
                <div class="error" v-if="$v.email.$dirty">
                    <p class="error-text p-1 ml-3" v-if="!$v.email.required">email is required</p>
                    <span class="error-text" v-if="$v.email.required">
                        <span class="error-text" v-if="!$v.email.validemail">Enter valid email</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="row p-4">
            <div class="col-md-2 col-sm-12"></div>
            <div class="col-md-4 col-sm-12">
                <div>
                    <multiselect v-model.trim="$v.designation.$model" :options="designationOptions" :searchable="true"
                        :close-on-select="true" :show-labels="false"
                        :class="{ 'form-group--error': $v.designation.$error }" placeholder="Select designation">
                    </multiselect>
                </div>
                <div class="error" v-if="$v.designation.$dirty">
                    <p class="error-text p-1 ml-3" v-if="!$v.designation.required">designation is required</p>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div>
                    <date-picker type="date" id="date" class="w-100" v-model="$v.dob.$model"
                        :class="{ 'form-group--error': $v.dob.$error }" :disabled-date="disabledFutureDays"
                        :valueType="format" :formatter="momentFormat" placeholder="DOB"></date-picker>
                    <div class="error" v-if="$v.dob.$dirty">
                        <p class="error-text p-1 ml-3" v-if="!$v.dob.required">Date-of-birth is required</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row p-4">
            <div id="map"></div>
        </div>
        <div class="row p-3">
            <div class="col-md-3 col-sm-12"></div>
            <div class="col-md-3 col-sm-10 text-end p-3">
                <button type="button" class="btn btn-secondary w-100" @click="createCompany()">Cancel &nbsp;</button>
            </div>
            <div class="col-md-3 col-sm-10 text-end p-3">
                <button type="button" class="btn btn-primary w-100 saveBtn" @click="saveUser()">Submit &nbsp;</button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import { required, helpers } from 'vuelidate/lib/validators';
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
const validemail = helpers.regex(
    "validemail",
    /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))+$)/
);
export default {
    components: {
        DatePicker,
        Multiselect
    },
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            designation: "",
            dob: "",
            format: "DD-MM-YYYY",
            company: "",
            momentFormat: {
                // Date to String
                stringify: (date) => {
                    console.log("STRING:", date);
                    return date ? this.$moment(date).format("DD-MM-YYYY") : "";
                },
                // String to Date
                parse: (value) => {
                    console.log("DATE:", value);
                    return value ? this.$moment(value, "DD-MM-YYYY").toDate() : null;
                },
            },
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
            companyOptions: [],
            designationOptions: ["Junior Developer", "senior Developer"],
            companiesLists: []
        }
    },

    validations: {
        firstName: {
            required
        },
        lastName: {
            required
        },
        email: {
            required,
            validemail
        },
        designation: {
            required
        },
        dob: {
            required
        },
    },

    watch: {
        company: function (val) {
            console.log("VAL", val)
        }
    },
    methods: {
        disabledFutureDays: function (date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return today < date;
            // return date < today || date > new Date(today.getTime() + 7 * 24 * 3600 * 1000);
        },

        saveUser: async function () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                let userObj = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    designation: this.designation,
                    dob: this.dob,
                    companyId: this.companyId
                }
                await this.$axios.$post(`/api/v1/users`, userObj)
                    .then((response) => {
                        let { data, message } = response;
                        this.$toast.success(message, this.toastObj);
                        setTimeout(() => {
                            this.$nuxt.$router.push({ path: `/companies/views/${this.companyId}` });
                        }, 1500);
                    }).catch((error) => {
                        console.log("ERR", error);
                        this.$toast.error(error.message, this.toastObj);
                    });
            }
        },

        getCompanies: async function () {
            await this.$axios.$get(`/api/v1/companies`)
                .then((response) => {
                    let { data } = response?.data ?? [];
                    data.map((item) => {
                        this.companyOptions.push({ companyName: item.companyName, _id: item._id })
                    })
                }).catch((error) => {
                    console.log("ERR", error);
                });
        }
    },

    mounted: function () {
        this.companyId = this.$route.params.company_id;
    }
}
</script>

<style>
</style>