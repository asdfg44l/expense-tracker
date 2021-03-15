const express = require('express')
const router = express.Router()

//routes
const home = require('./modules/home')
const users = require('./modules/users')
const records = require('./modules/records')

router.use('/', home)
router.use('/users', users)
router.use('/records', records)

module.exports = router