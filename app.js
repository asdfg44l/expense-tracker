const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const hbsHelpers = require('./util/handlebarsHelpers')
//mongodb
require('./config/mongoose')
const route = require('./routes')

//PORT
const PORT = 8080

//app
const app = express()

//view engine
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs', helpers: hbsHelpers }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//public
app.use(express.static('public'))

//route
app.use(route)

app.listen(PORT, () => {
    console.log(`The server is listening on http://localhost:${PORT}`)
})