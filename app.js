if(process.env.NODE_ENV == 'development'){
    require('dotenv').config()   
    }
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const error = require('./middlewares/errorHandler.js')
const router = require('./routers');

app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`App is connected to port ${port}`);
});


