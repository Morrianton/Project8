const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const app = express();

let port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let users = [];
let id = 0;

app.get('/', (req, res) => {
    res.render('index', {
        title: "Simple User Manager",
        pageTitle: "Simple User Manager"
    });
});

app.post('/users', (req, res) => {
    id++;
    users.push({
       userID: req.body.userID,
       name: req.body.name,
       age: req.body.age,
       email: req.body.email,
        id: id
    });
    res.render('users', {users: users});
});

app.get('/index', (req, res) => {
    res.render('index', {
        title: "Simple User Manager",
        pageTitle: "Simple User Manager"
    });
});

app.get('/user/:id', (req, res) => {
    res.render('edit', {
        userID: req.body.userID,
        name: req.body.name,
        age: req.body.age,
        id: req.params.id
    });
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});