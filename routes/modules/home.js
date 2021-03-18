const express = require('express')
const router = express.Router()

//record category
const categories = require('../../config/category.json').category
//monthList
const monthList = require('../../config/monthList.json').month

router.get('/', (req, res) => {
    const { category, year, month } = req.query
    console.log(req.query)
    res.render('index', { categories, categoryValue: category, year,  monthValue: month, monthList })
})

module.exports = router
