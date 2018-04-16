const express = require('express');
const path = require('path');

const router = express.Router();

const app = express();

let port = 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});