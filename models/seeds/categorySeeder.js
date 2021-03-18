const db = require('../../config/mongoose')
const Category = require('../category')

const categoryList = require('../../config/category.json').category

db.once('open', () => {
  return Promise.all(categoryList.map(item => {
    return Category.create({
      ...item
    })
  }))
    .then(() => console.log('Category seed build complete'))
    .catch(err => console.log(err))
    .finally(() => process.exit())
})