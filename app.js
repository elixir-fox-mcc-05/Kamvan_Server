if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const PORT = process.env.PORT
const cors = require('cors')
const routes = require('./routes/index')
const error = require('./middleware/errorhandler')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(routes)
app.use(error)

app.listen(PORT, () => console.log(`listening PORT ${PORT}`))
