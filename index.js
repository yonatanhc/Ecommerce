const express = require('express')
const app = express()
const user = require('./public/routes/user.js')
const login = require('./public/routes/login.js')
const perfil = require('./public/routes/perfil.js')
const cart = require('./public/routes/cart.js')
const bodyParser = require('body-parser')
const session = require('express-session')
const exphbs = require('express-handlebars')
const path = require("path")
const search = require('./public/routes/search.js')



const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/ecommerce',{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log('Conectado a MongoDb'))
    .catch(err=> console.log('No se ha conectado a mongoDb'))

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}))

// Parser para interpretar datos  en el body de un request
app.use(bodyParser.urlencoded({ extended: true }));

// Path de base de recursos estáticos (archivos linkeados en htmls)
app.use(express.static(path.join(__dirname, '/public')));

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layout')
}))

app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'));

app.post('/user',user)
app.post('/login',login)
app.get('/search',search)
app.get('/product',search)
app.get('/reviews',search)
app.get('/perfil',perfil)
app.get('/cart',cart)

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/loginInterfaz',(req,res)=>{
    if(req.session.user == undefined){
        res.render('login')
    }
    else{
        res.render('perfil',{
            user: req.session.user
        })
    }
    
})


app.get('/register',(req,res)=>{
    res.render('register');
})

app.get('/delete',(req,res)=>{
    if(req.session.user != undefined){
        var arreglo = req.session.user.cart
        var pos = searchArray(arreglo,req.query.id)
        req.session.user.total -= req.session.user.cart[pos].price
        arreglo.splice(pos,1)
    }
    res.render('perfil',{
        user: req.session.user
    })
})

function searchArray(arreglo,id){
    for (let i = 0; i < arreglo.length; i++) {
        if(arreglo[i].id == id) return i
    }
}

app.get("/exit",(req,res)=>{
    req.session.destroy();
    res.render('home');
});



const port = process.env.PORT || 3000
app.listen(port,()=> console.log('escuchando puerto  ' + port))

