const axios = require('axios');
const Response = require('../helpers/responses');
const StatusCodes = require('../helpers/Status');
const Endpoints = require('../endpoints/index');

class CompaniesController {
    createCompanies = async (req, res) => {
        try {
            let companyObj = {
                companyName: req?.body?.companyName ?? "",
                companyAddress: req?.body?.companyAddress,
                location: {
                    type: "Point",
                    coordinates: [req?.body?.location[0].lng, req?.body?.location[0].lat]
                }
            }
            await axios.post(`${Endpoints.baseUrl}/api/v1/companies`, companyObj)
                .then((response) => {
                    let { data, message } = response?.data;
                    Response.success(req, res, StatusCodes.HTTP_OK, data, message);
                }).catch((error) => {
                    let { data, message } = response?.data;
                    Response.error(req, res, StatusCodes.HTTP_OK, data, message);
                });
        }

        catch (error) {
            Response.success(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, {}, "Internal Server Error !");
        }
    }

    getCompanies = async (req, res) => {
        try {
            let pageSize = req?.query?.pageSize,page = req?.query?.page;
            await axios.get(`${Endpoints.baseUrl}/api/v1/companies?pageSize=${pageSize}&page=${page}`)
                .then((response) => {
                    let { data, message } = response?.data;
                    Response.success(req, res, StatusCodes.HTTP_OK, data, message);
                }).catch((error) => {
                    let { data, message } = error;
                    Response.error(req, res, StatusCodes.HTTP_OK, data, message);
                });
        }

        catch (error) {
            console.log("ERROR",error)
            Response.success(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, {}, "Internal Server Error !");
        }
    }

    getCompanyDetailById = async (req, res) => {
        try {
            let companyId = req.params.companyId;
            await axios.get(`${Endpoints.baseUrl}/api/v1/companies/${companyId}`)
                .then((response) => {
                    let { data, message } = response?.data;
                    Response.success(req, res, StatusCodes.HTTP_OK, data, message);
                }).catch((error) => {
                    let { data, message } = response?.data;
                    Response.error(req, res, StatusCodes.HTTP_OK, data, message);
                });
        }

        catch (error) {
            Response.success(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, {}, "Internal Server Error !");
        }
    }

    updateCompanies = async (req, res) => {
        try {
            let companyId = req.params.companyId, updateObj = req.body;
            await axios.put(`${Endpoints.baseUrl}/api/v1/companies/${companyId}`, updateObj)
                .then((response) => {
                    let { data, message } = response?.data;
                    Response.success(req, res, StatusCodes.HTTP_OK, data, message);
                }).catch((error) => {
                    let { data, message } = response?.data;
                    Response.error(req, res, StatusCodes.HTTP_OK, data, message);
                });
        }

        catch (error) {
            Response.success(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, {}, "Internal Server Error !");
        }
    }

    deleteCompany = async (req, res) => {
        try {
            let companyId = req.params.companyId;
            await axios.delete(`${Endpoints.baseUrl}/api/v1/companies/${companyId}`)
                .then((response) => {
                    let { data, message } = response?.data;
                    Response.success(req, res, StatusCodes.HTTP_OK, data, message);
                }).catch((error) => {
                    let { data, message } = response?.data;
                    Response.error(req, res, StatusCodes.HTTP_OK, data, message);
                });
        }

        catch (error) {
            Response.success(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, {}, "Internal Server Error !");
        }
    }
}

module.exports = new CompaniesController();