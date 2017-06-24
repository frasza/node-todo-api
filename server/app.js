const express = require('express');
var app = express();

var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');

var port = process.env.PORT || 3000;

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

// GET
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

// GET /:id
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send({});
        }

        res.send({todo});
    }).catch((err) => {
        res.status(400).send({});
    });
});


// Server listen
app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});

module.exports = { app };