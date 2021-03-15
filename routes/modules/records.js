const express = require('express')
const router = express.Router()

router.delete('/:id', (req, res) => {
    const record_id = req.params.id
    console.log(record_id)
    res.redirect('/')
})

module.exports = router