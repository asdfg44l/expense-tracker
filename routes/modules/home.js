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
    const userId = req.user._id
    const { category, year, month } = req.query
    Record.find({ userId })
        .lean()
        .then(records => {
            //searchFilter

            //dateFormat => yyyy-mm-dd 
            records.forEach(record => {
                record.date = dateTimeFormat(record.date)
            })
            //iconFilter get icon by compare to category

            //計算總金額
            let totalAmount = records.reduce((prev, record) => prev += record.amount, 0)

            return res.render('index', {
                categories,
                categoryValue: category,
                year,
                monthValue: month,
                monthList,
                totalAmount,
                records
            })
        })
        .catch(err => console.log(err))

})

module.exports = router
