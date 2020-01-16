
const express = require('express')
const meli = require('mercadolibre')
const router = express.Router()

router.get('/cart',async (req,res)=>{
    if(req.session.user != undefined){
        let product = await searchId(req.query.id)
        //res.send(product)
        
        if(product){
            let prod = {
                id : req.query.id,
                title: product.title,
                price: product.price,
                img : product.pictures[0].url
                
            }
            
            req.session.user.cart.push(prod)
            req.session.user.total += product.price
            
            res.render('perfil',{
                user:req.session.user
            })
        }
    }
    else{
        location = '/loginInterfaz'
    }
})

function searchId(data){
    return new Promise(function(resolve,reject){
        var meliObject = new meli.Meli(5269024433415053,"Fd9Vaj79omHDucoIq56AnYB1eOWes2OD");
        meliObject.getAuthURL("https://localhost:3000") 
        meliObject.get('/items?ids='+data,function(err, resp) {
            resolve(resp[0].body) 
        })
    })
}

module.exports = router