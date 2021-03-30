const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
//monthList
const monthList = require('../../config/monthList.json').month

//util
const dateTimeFormat = require('../../util/dateTimeFormat')
const getRecordYear = require('../../util/getRecordYear')

router.get('/', async (req, res) => {
    const userId = req.user._id
    const { category, year, month } = req.query
    console.log('Year: ', year)
    console.log('Month: ', month)
    try {
        //使用 aggregate 不需要使用 lean()
        //https://stackoverflow.com/questions/47768327/mongodb-using-lean-on-aggregate-function
        let records = await Record.aggregate([
            {
                $project: {
                    id: 1,
                    name: 1,
                    category: 1,
                    date: 1,
                    amount: 1,
                    merchant: 1,
                    "year": { $year: '$date' },
                    "month": { $month: '$date' },
                    userId: 1
                }
            },
            {
                $match: {
                    userId,
                    category: category || String,
                    year: year ? Number(year) : Number, //default value 就直接帶 column 的型別
                    month: month ? Number(month) : Number
                }
            },
            { $sort: { date: -1 } }
        ])
        let categories = await Category.find().lean()
        let yearList = new Set() //存取所有收支紀錄中的年份
        //searchFilter
        // records = records.filter(record => {
        //     let recordYear = record.date.getFullYear().toString()
        //     let recordMonth = (record.date.getMonth() + 1).toString()

        //     //generate yearList 存取所有收支紀錄中的年份
        //     yearList = getRecordYear(recordYear, yearList)

        //     const categoryFilter = category === record.category || !category
        //     const yearFilter = year === recordYear || !year
        //     const monthFilter = month === recordMonth || !month

        //     return categoryFilter && yearFilter && monthFilter
        // })
        records.forEach(record => {
            //generate yearList 存取所有收支紀錄中的年份
            yearList = getRecordYear(record, yearList)

            //dateFormat => yyyy-mm-dd
            record.date = dateTimeFormat(record.date)

            //iconFilter get icon by compare to category
            record.iconName = categories.find(item => item.name === record.category).className
        })

        //計算總金額
        let totalAmount = records.reduce((prev, record) => prev += record.amount, 0)

        return res.render('index', {
            categories,
            categoryValue: category,
            yearValue: year,
            monthValue: month,
            yearList,
            monthList,
            totalAmount,
            records
        })
    } catch (e) {
        console.warn(e)
    }

})

module.exports = router
