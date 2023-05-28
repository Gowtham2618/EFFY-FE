<template>
  <div>
    <div class="row">
      <div class="col-md-8 col-sm-12">
        <h3 class="b">COMPANIES LISTS</h3>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-md-9 col-sm-12"></div>
      <div class="col-md-3 col-sm-12 text-end">
        <button type="button" class="btn btn-primary" @click="goToCompany()">Create &nbsp;
          <i class="bi bi-plus-circle"></i></button>
      </div>
    </div>
    <div class="row p-4">
      <div class="col-md-12 col-sm-12">
        <vue-good-table :columns="columns" :rows="rows" @on-cell-click="onCellClick"
          :pagination-options="paginationOptions" :search-options="{ enabled: true, placeholder: 'Search company' }" />
      </div>
    </div>
    <div class="row">
      <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
        data-bs-whatever="@mdo">Open modal for @mdo</button> -->

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Delete Company</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <p>Are you sure you want to delete <b>{{ this.companyName }}</b> !</p>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" @click.prevent="deleteCompany()"><i class="bi bi-trash"></i>
                &nbsp;Delete</button>
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
export default {
  components: {
    VueGoodTable
  },
  data() {
    return {
      companiesLists: "",
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
          label: 'Company Name',
          field: 'companyName',
          type: 'string',
        },
        {
          label: 'Company Address',
          field: 'companyAddress',
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
      page: 1,
      pageSize: 10,
      totalRecords: null,
      companyName: null,
      companyId: ""
    }
  },

  methods: {
    getCompaniesLists: async function () {
      await this.$axios.$get(`/api/v1/companies?pageSize=${this.pageSize}&page=${this.page}`)
        .then((response) => {
          let { data } = response?.data ?? [];
          this.totalRecords = response?.data?.totalRecords ?? 0;
          // this.paginationOptions.setCurrentPage = response?.data?.totalPages ?? 1;
          data.map((item, i) => {
            this.rows.push({
              sno: Number(i + 1), companyName: item.companyName, companyAddress: item.companyAddress, id: item._id,
              action: `<span><i class="bi bi-eye text-secondary" id="view"></i></span>&nbsp;
                  <span><i class="bi bi-pencil-square text-primary" id="edit"></i></span>&nbsp;
                  <span><i class="bi bi-trash text-danger" id="delete"></i>`,
            })
          })
        }).catch((error) => {
          console.log("ERR", error);
        });
    },

    goToCompany: function () {
      this.$nuxt.$router.push({ path: "/companies" });
    },

    updateCompany: function (companyId) {
      this.$nuxt.$router.push({ path: `/companies/${companyId}` })
    },

    deleteCompany: async function () {
      $('#exampleModal').modal('hide');
      await this.$axios.$delete(`/api/v1/companies/${this.companyId}`)
        .then((response) => {
          let { data, message } = response;
          this.$toast.success(message, this.toastObj);

          setTimeout(() => {
            // window.location.reload();
            this.rows = [];
            this.getCompaniesLists();
          }), 2000;
        }).catch((error) => {
          this.$toast.error(error.message, this.toastObj);
        });
    },

    showDeletePopup: function () {
      $('#exampleModal').modal('show');
    },

    viewCompanies: async function (companyId) {
      this.$nuxt.$router.push({ path: `/companies/views/${companyId}` });
    },

    onCellClick: function (data) {
      let companyId = data?.row.id;
      this.companyName = data?.row?.companyName;
      this.companyId = companyId;
      let { id } = data?.event?.target;
      switch (id) {
        case 'edit':
          this.updateCompany(companyId)
          break;
        case 'view':
          this.viewCompanies(companyId);
          break;
        case 'delete':
          this.showDeletePopup();
          break;
      }
    }
  },

  mounted: function () {
    this.getCompaniesLists();
  }
}
</script>

<!-- <style>
.dd {
  font-family: 'Bree Serif', serif;
}
</style> -->
