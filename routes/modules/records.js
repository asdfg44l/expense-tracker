const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
//record category
const category = require('../../config/category.json').category

//util
const dateTimeFormat = require('../../util/dateTimeFormat')

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
    const record_id = req.params.id
    const config = {
        title: '修改支出',
        action: `/records/${record_id}?_method=PUT`
    }
    Record.findById(record_id)
        .lean()
        .then(record => {
            record.date = dateTimeFormat(record.date)
            return res.render('edit', { config, category, record })
        })
        .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
    const { name, category, date, amount, merchant } = req.body
    const record_id = req.params.id
    // console.log("Edit: ", record_edit)
    Record.findById(record_id)
        .then(record => {
            console.log('inner: ', record)
            record.name = name
            record.category = category
            record.date = date
            record.amount = amount
            record.merchant = merchant
            return record.save()
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

})

router.delete('/:id', (req, res) => {
    const record_id = req.params.id
    Record.findById(record_id)
        .then(record => {
            record.remove()
            return res.redirect('/')
        })
        .catch(err => console.log(err))
})

module.exports = router