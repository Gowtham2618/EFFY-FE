const axios = require('axios');
const Response = require('../helpers/responses');
const StatusCodes = require('../helpers/Status');
const Endpoints = require('../endpoints/index');

class User {
    createUser = async (req, res) => {
        try {
            let userObj = req?.body;
            await axios.post(`${Endpoints.baseUrl}/api/v1/users`, userObj)
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

    getUsers = async (req, res) => {
        try {
            let companyId = req?.query?.companyId;
            await axios.get(`${Endpoints.baseUrl}/api/v1/users?companyId=${companyId}`)
                .then((response) => {
                    let { data, message } = response?.data;
                    Response.success(req, res, StatusCodes.HTTP_OK, data, message);
                }).catch((error) => {
                    let { data, message } = response?.data;
                    Response.error(req, res, StatusCodes.HTTP_OK, data, message);
                });
        }

        catch (error) {
            console.log("ERROR##########", error)
            Response.success(req, res, StatusCodes.HTTP_INTERNAL_SERVER_ERROR, {}, "Internal Server Error !");
        }
    }

    getUserById = async (req, res) => {
        try {
            let userId = req?.params?.userId;
            await axios.get(`${Endpoints.baseUrl}/api/v1/users/${userId}`)
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

    updateUser = async (req, res) => {
        try {
            let userId = req?.params?.userId, updateObj = req?.body;
            await axios.put(`${Endpoints.baseUrl}/api/v1/users/${userId}`, updateObj)
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

    migrateUsers = async (req, res) => {
        try {
            let migrationObj = req?.body;
            await axios.post(`${Endpoints.baseUrl}/api/v1/users/migrateUsers`, migrationObj)
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

    deleteUser = async (req, res) => {
        try {
            let userId = req?.params?.userId;
            console.log("USERID...........", userId)
            await axios.delete(`${Endpoints.baseUrl}/api/v1/users/${userId}`)
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

module.exports = new User();