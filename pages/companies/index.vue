<template>
    <div>
        <div class="row">
            <div class="col-md-8 col-sm-12">
                <h3 class="b">CREATE COMPANY</h3>
            </div>
        </div>
        <hr>
        <div class="row p-3">
            <div class="col-md-3 col-sm-12"></div>
            <div class="col-md-6 col-sm-12">
                <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-house"></i></span>
                    <input type="text" class="form-control" v-model.trim="$v.companyName.$model"
                        :class="{ 'form-group--error': $v.companyName.$error }" placeholder="Company Name"
                        aria-label="Username">
                </div>
                <div class="error" v-if="$v.companyName.$dirty">
                    <p class="error-text p-1 ml-3" v-if="!$v.companyName.required">company name is required</p>
                </div>
            </div>
        </div>
        <div class="row p-3">
            <div class="col-md-3 col-sm-12"></div>
            <div class="col-md-6 col-sm-12">
                <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-geo-alt"></i></span>
                    <gmap-autocomplete class="form-control" placeholder="Company Address"
                        :class="{ 'form-group--error': $v.companyAddress.$error }" :select-first-on-enter="true"
                        :value="this.companyAddress" @place_changed="changePlace"></gmap-autocomplete>
                </div>
                <div class="error" v-if="$v.companyAddress.$dirty">
                    <p class="error-text p-1 ml-3" v-if="!$v.companyAddress.required">company address is required</p>
                </div>
            </div>
        </div>

        <div class="row p-3">
            <div class="col-md-2 col-sm-12"></div>
            <div class="col-md-8 col-sm-12">
                <GmapMap :center="center" :zoom="10" map-type-id="terrain" style="width: 100%; height: 440px" ref="myMap">
                    <gmap-marker :key="index" v-for="(gmp, index) in locations" :clickable="true" :draggable="true"
                        :position="gmp" @click="center = gmp"></gmap-marker>
                </GmapMap>
            </div>
        </div>


        <div class="row p-3">
            <div class="col-md-3 col-sm-12"></div>
            <div class="col-md-3 col-sm-10 text-end p-3">
                <button type="button" class="btn btn-secondary w-100" @click="createCompany()">Cancel &nbsp;</button>
            </div>
            <div class="col-md-3 col-sm-10 text-end p-3">
                <button type="button" class="btn btn-primary w-100 saveBtn" @click="saveCompany()">Submit &nbsp;</button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
import { required, minLength, between } from 'vuelidate/lib/validators';
// import Service from '../../service/companies/companiesController';
export default {
    data() {
        return {
            companyName: "",
            companyAddress: "",
            center: {
                lat: 0,
                lng: 0
            },
            locations: [],
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
            }
        }
    },

    validations: {
        companyName: {
            required
        },
        companyAddress: {
            required
        }
    },
    methods: {
        saveCompany: async function () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                let companyObj = {
                    companyName: this.companyName,
                    companyAddress: this.companyAddress,
                    location: this.locations
                }

                await this.$axios.$post(`/api/v1/companies`, companyObj)
                    .then((response) => {
                        let { data, message } = response;
                        this.$toast.success(message, this.toastObj);
                        setTimeout(() => {
                            this.$nuxt.$router.push({ path: "/" });
                        }, 2500);
                    }).catch((error) => {
                        this.$toast.error(error.message, this.toastObj);
                    });
            }
        },

        initMap: function () {
            navigator.geolocation.getCurrentPosition(async (position) => {
                let { latitude, longitude } = position.coords;
                this.center.lat = latitude;
                this.center.lng = longitude;
                this.locations.push({
                    lat: latitude,
                    lng: longitude,
                },)
            });
        },

        changePlace: function (loc) {
            this.companyAddress = loc.formatted_address;
            this.locations = [{
                lat: loc.geometry.location.lat(),
                lng: loc.geometry.location.lng()
            }];

            this.center.lat = loc.geometry.location.lat();
            this.center.lng = loc.geometry.location.lng();
        }



    },

    mounted: function () {
        this.initMap();
    }
}
</script>

<!-- <style>
.form-group--error {
    border: 1px solid red;
}

.error-text {
    color: red;
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
}

.saveBtn {
    background-color: blueviolet !important;
}
</style> -->