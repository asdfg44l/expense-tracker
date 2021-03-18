const express = require('express')
const router = express.Router()
const passport = require('passport')

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

router.post('/register', (req, res) => {
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
    User.findOne({ email }).then(user => {
        if (user) {
            return req.flash('warning_msg', '此電子郵件已被註冊')
        }
        User.create({
            ...req.body
        })
            .then(() => res.redirect('/users/login'))
            .catch(err => console.log(err))
    })
        .catch(err => console.log(err))
})

router.get('/logOut', (req, res) => {
    req.logOut()
    res.redirect('/login')
    return req.flash('success_msg', '您已成功登出')
})

module.exports = router