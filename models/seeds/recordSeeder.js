const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')

const defaultUsers = [
  {//#1, 2, 3
    name: 'root1',
    password: '12345678',
    email: 'user1@example.com',
  },
  {
    name: 'root2',
    password: '12345678',
    email: 'user2@example.com',
  }
]

const defaultRecord = {
  name: 'PS5',
  category: 'entertainment',
  date: Date.now(),
  amount: 13000,
  merchant: 'PChome',
  userId: ''
}

db.once('open', async () => {
  try {
    for (i = 0; i < defaultUsers.length; i++) {
      let defaultUser = defaultUsers[i]
      let dbUser = await User.findOne({ email: defaultUser.email })
      if (dbUser) continue

      //create new user in db
      let newUser = await User.create({
        name: defaultUser.name,
        password: defaultUser.password,
        email: defaultUser.email
      })

      //add new record
      await Record.create({ ...defaultRecord, userId: newUser._id })
    }
  } catch (e) {
    console.warn(e)
  } finally {
    console.log('record seed has finished ')
    process.exit()
  }
})
