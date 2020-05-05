"use strict";

if(process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express();
const PORT = 3000;
const routes = require('./routes')
const errorHandlers = require('./middlewares/errorhandlers')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes)
app.use(errorHandlers)

app.listen(PORT, () => console.log(`Connected to port ${PORT}`))