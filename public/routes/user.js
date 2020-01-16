const bcrypt = require('bcrypt')
const mongosee = require('mongoose')
const express = require('express')
const User = require('../models/user.js')
const session = require('express-session')
const router = express.Router()
const { check, validationResult } = require('express-validator');

router.post('/user', [
    check('name').isLength({min: 3}),
    check('email').isEmail(),
    check('password').isLength({min: 8}),
],async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let user = await User.findOne({email: req.body.email}) //buscamos si email ya existe
    if(user) return res.status(400).send('Ese usuario ya existe')

    //encriptamos el password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        isCustomer: false
    })
    user.total = 0
    const result = await user.save()
    
    req.session.user = result
    res.render('perfil',{
        user:req.session.user
    })
})

module.exports = router