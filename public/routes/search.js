const express = require('express')
const meli = require('mercadolibre')
const router = express.Router()

router.get('/search',async (req,res)=>{
    var result = await search(req.query.search)
        res.render('search',{
            result : result
        })
})

router.get('/product',async (req,res)=>{
    var result = await searchId(req.query.id)
    var comments = await searchComments(req.query.id)
    res.render('product',{
        product: result,
        comments : comments
    })
    
})


function search(data){
    return new Promise(function(resolve,reject){
        var meliObject = new meli.Meli(5269024433415053,"Fd9Vaj79omHDucoIq56AnYB1eOWes2OD");
        meliObject.getAuthURL("https://localhost:3000") 
        meliObject.get('/sites/MLA/search?q='+data,function(err, resp) {
            resolve(resp.results) 
        })
    })
}

function searchId(data){
    return new Promise(function(resolve,reject){
        var meliObject = new meli.Meli(5269024433415053,"Fd9Vaj79omHDucoIq56AnYB1eOWes2OD");
        meliObject.getAuthURL("https://localhost:3000") 
        meliObject.get('/items?ids='+data,function(err, resp) {
            resolve(resp[0].body) 
        })
    })
}

function searchComments(data){
    return new Promise(function(resolve,reject){
        var meliObject = new meli.Meli(5269024433415053,"Fd9Vaj79omHDucoIq56AnYB1eOWes2OD");
        meliObject.getAuthURL("https://localhost:3000") 
        meliObject.get('/reviews/item/'+data,function(err, resp) {
            resolve(resp.reviews) 
        })
    })
}


module.exports = router