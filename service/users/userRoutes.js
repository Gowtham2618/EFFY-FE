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

const UserCtrl = require('./userController');

app.post('/',
    UserCtrl.createUser
);

app.get('/',
    UserCtrl.getUsers
);

app.get('/:userId',
    UserCtrl.getUserById
);

app.put('/:userId',
    UserCtrl.updateUser
);

app.post('/migrateUser',
    UserCtrl.migrateUsers
);

app.delete('/:userId',
    UserCtrl.deleteUser
);


module.exports = app;