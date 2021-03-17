const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
//connect
mongoose.connect(MONGODB_URI, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error')
})

db.once('open', () => {
    console.log('mongodb is working')
})

module.exports = db