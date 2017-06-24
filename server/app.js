const express = require('express');
var app = express();

var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


//Midlewares
app.use(bodyParser.json());


// POST
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});



app.listen(3000, () => {
    console.log('Server is listening on port 3000.');
});