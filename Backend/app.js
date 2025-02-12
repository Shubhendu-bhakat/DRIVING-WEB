const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const cors = require('cors'); //make sure to install the cors package and dotenv package
app.use(cors());//cross domain request handler
//db connection 
const connectToDB = require('./db/db');
connectToDB();

app.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app;
