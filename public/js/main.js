
const exit = document.getElementById('exit')
const cuenta = document.getElementById('cuenta')
const inicio = document.getElementById("inicio")

exit.addEventListener('click',()=>{
    location = '/exit'
})

cuenta.addEventListener('click',()=>{
    location = '/loginInterfaz'
})

inicio.addEventListener('click',()=>{
    location = '/'
})