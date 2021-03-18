const express = require('express')
const exhbs = require('express-handlebars')
const session = require('express-session')
const usePassport = require('./config/passport')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
require('./config/dotenv').loadEnv() //load env
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

//session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))


//passport
usePassport(app)

//
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    return next()
})

//route
app.use(route)

app.listen(PORT, () => {
    console.log(`The server is listening on http://localhost:${PORT}`)
})