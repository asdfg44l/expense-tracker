const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
module.exports = app => {
  //init
  app.use(passport.initialize())
  app.use(passport.session())

  //localStrategy
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    console.log('password: ', password)
    User.findOne({ email }).then(user => {
      console.log('aaaa')
      if (!user) {
        console.log('bbbb')
        return done(null, false, req.flash('warning_msg', '此帳號未被註冊'))
      }
      if (user.password !== password) {
        console.log('cccc')
        return done(null, false, req.flash('success_msg', '帳號或密碼輸入錯誤'))
      }
      return done(null, user)
    })
      .catch(err => done(err, false))
  }))

  //序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  //去序列化
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, false))
  })
}