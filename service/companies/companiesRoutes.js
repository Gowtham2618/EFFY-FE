const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

const CompaniesCtrl = require('./companiesController');

app.post('/',
    CompaniesCtrl.createCompanies
);

app.get('/',
    CompaniesCtrl.getCompanies
)

app.get('/:companyId',
    CompaniesCtrl.getCompanyDetailById
);

app.put('/:companyId',
    CompaniesCtrl.updateCompanies
)

app.delete('/:companyId',
    CompaniesCtrl.deleteCompany
);


module.exports = app;