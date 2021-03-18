const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login'
    })
)

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    let errors = []
    const { name, email, password, confirmPassword } = req.body
    if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: '所有欄位皆為必填' })
    }
    if (password !== confirmPassword) {
        errors.push({ message: '密碼與確認密碼不相符' })
    }
    if (errors.length) {
        return res.render('register', { ...req.body, errors })
    }

    try {
        let user = await User.findOne({ email })

        if (user) return req.flash('warning_msg', '此電子郵件已被註冊')

        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(password, salt) //generate hash

        //register user
        await User.create({ name, email, password: hash })
        return res.redirect('/users/login')
    } catch (e) {
        console.warn(e)
    }
})

router.get('/logOut', (req, res) => {
    req.logOut()
    res.redirect('/login')
    return req.flash('success_msg', '您已成功登出')
})

module.exports = router