const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
//monthList
const monthList = require('../../config/monthList.json').month

//util
const dateTimeFormat = require('../../util/dateTimeFormat')

router.get('/', async (req, res) => {
    const userId = req.user._id
    const { category, year, month } = req.query
    console.log({ category, year, month })
    try {
        let records = await Record.find({ userId }).lean()
        let categories = await Category.find().lean()
        //searchFilter
        records = records.filter(record => {
            let recordYear = record.date.getFullYear().toString()
            let recordMonth = record.date.getMonth().toString()

            const categoryFilter = category === record.category || !category
            const yearFilter = year === recordYear || !year
            const monthFilter = month === recordMonth || !month || month === 'all'

            return categoryFilter && yearFilter && monthFilter
        })
        //dateFormat => yyyy-mm-dd
        //iconFilter get icon by compare to category
        records.forEach(record => {
            record.date = dateTimeFormat(record.date)
            record.iconName = categories.find(item => item.name === record.category).className
        })

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
    } catch (e) {
        console.warn(e)
    }

})

module.exports = router
