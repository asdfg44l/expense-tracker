const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('new')
})

router.delete('/:id', (req, res) => {
    const record_id = req.params.id
    console.log(record_id)
    res.redirect('/')
})

module.exports = router