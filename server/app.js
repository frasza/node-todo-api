const express = require('express');
var app = express();

var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');







app.listen(3000, () => {
    console.log('Server is listening on port 3000.');
});