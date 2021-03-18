const express = require('express')
const router = express.Router()

//middleware
const { isAuthenticate } = require('../middleware/auth')

//routes
const home = require('./modules/home')
const users = require('./modules/users')
const records = require('./modules/records')

//use
router.use('/records', isAuthenticate, records)
router.use('/users', users)
router.use('/', isAuthenticate, home)

module.exports = router