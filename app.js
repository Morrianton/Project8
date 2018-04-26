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

let file = 'users.json';
let json = {};
let obj;

let id = 1;

app.get('/', (req, res) => {
    res.render('index');
});

// Adds new user to users table via POST request
app.post('/users', (req, res) => {

    fs.open(file, 'w+', (err, fd) => {
        if (err) throw err;

        console.log(file + ' opened');

        // add user object to users array and write to file
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) throw err;

            // check for data & add user if yes
            if (data) {
                obj = JSON.parse(data);

                // loop through users to determine what id should be
                obj.users.forEach((user) => {
                    if(id === user.id) {
                        id++;
                    }
                });

                // create user object
                let user = {
                    id: id,
                    userID: req.body.userID,
                    name: req.body.name,
                    age: req.body.age,
                    email: req.body. email
                };

                // add user to users array & write to file
                obj.users.push(user);
                json = JSON.stringify(obj);
                fs.writeFile(file, json, 'utf8', (err) => {
                    if (err) throw err;

                    console.log(`${req.body.userID.toString()} was added to ` + file);
                });

                fs.close(fd, () => {
                    console.log(file + ' closed');
                });

            }
            // create file if no data
            else {
                let buffer = new Buffer('{"users":[]}');
                fs.write(fd, buffer, 0, buffer.length, null, (err) => {
                    if (err) throw err;

                    fs.readFile(file, 'utf8', (err, data) => {

                        obj = JSON.parse(data);

                        // loop through users to determine what id should be
                        obj.users.forEach((user) => {
                            if(id === user.id) {
                                id++;
                            }
                        });

                        // create user object
                        let user = {
                            id: id,
                            userID: req.body.userID,
                            name: req.body.name,
                            age: req.body.age,
                            email: req.body. email
                        };

                        // add user to users array & write to file
                        obj.users.push(user);
                        json = JSON.stringify(obj);
                        fs.writeFile(file, json, 'utf8', (err) => {
                            if (err) throw err;

                            console.log(`${req.body.userID.toString()} was added to ` + file);
                        });

                        fs.close(fd, () => {
                            console.log(file + ' closed')
                        });

                        console.log(obj.users);
                    });
                });
            }

        });
    });

    res.render('users', {users: obj.users})

});

app.get('/users', (req, res) => {
    res.render('users',
        {
            users: obj.users
        });
});

app.get('/edit-user/:id', (req, res) => {
    res.render('edit', {user: obj.users[req.params.id]});
});

app.get('/delete', (req, res) => {
   users.splice((req.params.id), 1);
   res.render('users', {users: obj.users});
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});