const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
    const config = {
        title: '新增支出'
    }
    res.render('new', { config })
})

router.get('/:id/edit', (req, res) => {
    const config = {
        title: '修改支出'
    }
    res.render('edit', { config })
})

router.put('/:id', (req, res) => {
    console.log(req.body)
    res.render('index')
})

router.delete('/:id', (req, res) => {
    const record_id = req.params.id
    console.log("DELETE: ", record_id)
    res.redirect('/')
})

module.exports = router