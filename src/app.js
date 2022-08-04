const cors = require('cors');
const express = require('express');
const app = express();
const route = require('./routes/');
const {
    errorHandler
} = require("./middlewares");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', route);
app.use(errorHandler);

module.exports = app;