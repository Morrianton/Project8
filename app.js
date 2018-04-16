const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const app = express();

let port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {
        title: "Simple User Manager",
        pageTitle: "Simple User Manager"
    });
});

app.get('/users', (req, res) => {
   res.render('users');
});

app.post('/users', (req, res) => {
    res.render('users', {
        users: [
            {firstName: req.body.firstName},
            {lastName: req.body.lastName},
            {age: req.body.age},
            {email: req.body.email}
        ]
    });
    res.end();
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});