const mongosee = require('mongoose')
const express = require('express')
const session = require('express-session')
const router = express.Router()


router.get('/perfil',(req,res)=>{
    if(req.session.user != undefined){
        res.render('perfil',{
            user : req.session.user
        })
    }
    else{
        
        location = '/loginInterfaz'
    }
})

module.exports = router