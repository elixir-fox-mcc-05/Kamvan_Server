if (process.env.NODE_ENV == 'dev') {
  require('dotenv').config()
}
const PORT = process.env.PORT || 3000
const express = require("express")
const cors = require('cors')
const app = express()
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(errorHandler)
app.use('/', routes)

app.listen(PORT, () => {
  console.log('Server Port : ' + PORT)
})