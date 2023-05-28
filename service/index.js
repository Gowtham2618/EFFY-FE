var express = require('express');
var app = express();
var bodyParser = require('body-parser');

require('dotenv').config();
// const config = require('./config/config');

app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));


app.use('/users', require('./users/userRoutes'));
app.use('/companies', require('./companies/companiesRoutes'));

module.exports = {
    path: '/api/v1',
    handler: app
}

