<template>
    <div>
        <div class="navBar p-4" style="max-height: 100%;">
            <h5 class="p-2 text-start"><i class="bi bi-clipboard-data-fill"></i> &nbsp; EFFY DASHBOARD</h5>
            <hr>
            <div class="collapse-head mt-5">
                <!-- Companies - SideBar - Menu -->
                <h5 class="p-3" type="button" data-bs-toggle="collapse" data-bs-target="#employeesTab" aria-expanded="false"
                    aria-controls="employeesTab">
                    <p class="sideBar_text" @click="CompanyTab()"><i class="bi bi-house-fill"></i> &nbsp; Companies</p>
                </h5>
                <h5 class="p-3" type="button" data-bs-toggle="collapse" data-bs-target="#employeesTab" aria-expanded="false"
                    aria-controls="employeesTab">
                    <p class="sideBar_text" @click="UserTab()"><i class="bi bi-people-fill"></i> &nbsp; Users</p>
                </h5>
            </div>


        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            accessToken: '',
            userDetails: {
                name: '',
                email: ''
            }
        }
    },
    methods: {
        UserTab: function () {
            this.$nuxt.$router.push({ path: '/users' });
        },
        CompanyTab: function () {
            this.$nuxt.$router.push({ path: '/' });
        }
    },
};
</script>
  
<style>
.sideBar_text {
    color: rgb(116, 113, 113) !important;
}

h3,h5,p {
    font-family: 'Vollkorn', serif;
}
.card-body {
    /* border: none; */
    cursor: pointer !important;
}

.navBar {
    border: 1px solid rgb(216, 211, 211);
    border-radius: 1rem;
}
</style>