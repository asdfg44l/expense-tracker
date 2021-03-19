const express = require('express')
const router = express.Router()

//middleware
const { isAuthenticate } = require('../middleware/auth')

//routes
const home = require('./modules/home')
const users = require('./modules/users')
const records = require('./modules/records')
const auth = require('./modules/auth')

//use
router.use('/records', isAuthenticate, records)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', isAuthenticate, home)

module.exports = router