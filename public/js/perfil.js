
const e = document.getElementById('exit')
const c = document.getElementById('cuenta')
const l = document.getElementById('login')
const r = document.getElementById('register')

e.classList.remove("oculto");
c.classList.remove("oculto");
l.classList.add('oculto')
r.classList.add('oculto')


function eliminar(id){
    
    var cart = document.getElementById('cart');
    var cartProduct = document.getElementById(id);
    cart.removeChild(cartProduct);
    location = "/delete?id=" + id;
}