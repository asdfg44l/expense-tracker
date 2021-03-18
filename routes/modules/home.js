const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
//record category
const categories = require('../../config/category.json').category
//monthList
const monthList = require('../../config/monthList.json').month

//util
const dateTimeFormat = require('../../util/dateTimeFormat')

router.get('/', (req, res) => {
    const { category, year, month } = req.query
    console.log(req.query)
    Record.find()
        .lean()
        .then(records => {
            //datefilter
            records.forEach(record => {
                record.date = dateTimeFormat(record.date)
            })
            return res.render('index', {
                categories,
                categoryValue: category,
                year,
                monthValue: month,
                monthList,
                records
            })
        })
        .catch(err => console.log(err))

})

module.exports = router
