const express = require('express')
const router = express.Router()

//record category
const categories = require('../../config/category.json').category

router.get('/', (req, res) => {
    const { category, year, month } = req.query
    console.log(req.query)
    res.render('index', { categories, category, year, monthValue: '1' })
})

module.exports = router
