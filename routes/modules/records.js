const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
//record category
const category = require('../../config/category.json').category

router.get('/new', (req, res) => {
    const config = {
        title: '新增支出',
        action: '/records'
    }
    res.render('new', { config, category })
})

router.post('/', (req, res) => {
    const record = req.body
    Record.create({
        ...record
    })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

})

router.get('/:id/edit', (req, res) => {
    const config = {
        title: '修改支出',
        action: '/records/123?_method=PUT'
    }
    res.render('edit', { config, category })
})

router.put('/:id', (req, res) => {
    const record = req.body
    console.log("Edit: ", record)
    res.render('index')
})

router.delete('/:id', (req, res) => {
    const record_id = req.params.id
    console.log("DELETE: ", record_id)
    res.redirect('/')
})

module.exports = router