const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')
module.exports = app => {
  //init
  app.use(passport.initialize())
  app.use(passport.session())

  //localStrategy
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
    try {
      let user = await User.findOne({ email })

      if (!user) return done(null, false, req.flash('warning_msg', '此帳號未被註冊'))

      //compare password
      if (!await bcrypt.compare(password, user.password)) {
        return done(null, false, req.flash('success_msg', '帳號或密碼輸入錯誤'))
      }

      return done(null, user)

    } catch (e) {
      return done(err, false)
    }
  }))

  //FacebookStrategy
  passport.use(new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK,
      profileFields: ['email', 'displayName']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let { name, email } = profile._json
        let dbUser = await User.findOne({ email })
        if (dbUser) return done(null, dbUser)

        //randomPassword
        let randomPassword = Math.random().toString(36).slice(-8)
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(randomPassword, salt)
        let user = await User.create({
          name,
          email,
          password: hash
        })

        return done(null, user)

      } catch (e) {
        return done(e, false)
      }

    }
  ))

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