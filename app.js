"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const router = require("./routes/index");
require('dotenv').config();

app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(router);
app.use(express.json());

app.listen(port, ()=>{
    console.log("This app is listening to port", port);
    
});