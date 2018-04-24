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
    res.render('index');
});

app.post('/users', (req, res) => {
    fs.writeFile();
    users.push({
        userID: req.body.userID,
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        ident: id
    });
    id++;
    res.render('users', {users: users});
});

app.get('/users', (req, res) => {
    res.render('users',
        {
            users: users
        });
});

app.get('/edit-user/:id', (req, res) => {
    res.render('edit', {user: users[req.params.id]});
});

app.get('/delete', (req, res) => {
   users.splice((req.params.id), 1);
   res.render('users', {users: users});
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});