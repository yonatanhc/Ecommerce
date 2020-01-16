const bcrypt = require('bcrypt')
const mongosee = require('mongoose')
const User = require('../models/user.js')
const express = require('express')
const session = require('express-session')
const router = express.Router()
const { check, validationResult } = require('express-validator');

router.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}))

router.post('/login',[
    check('email').isEmail(),
    check('password').isLength({min: 8}),
],async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Usuario o contraseña incorrectos')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Usuario o contraseña incorrectos')

    req.session.user = user
    
    res.render('perfil',{
        user:req.session.user
    })
    
})

module.exports = router
