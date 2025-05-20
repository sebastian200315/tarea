import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'


/* let message = document.querySelector('#message' )
let pingButton = document.querySelector('#pingButton')

pingButton.addEventListener('click',getPing)

//pingButton.addEventListener('click',getPingFromWebServices)

function getPing(){
console.log('pong Cuyago')
message. innerHTML = 'pong Cuyago'
} */

let pingButton = document.querySelector('#pingButton')

//emparejar el boton con la funcion
pingButton.addEventListener('click',getPingFromWebServices)

function getPingFromWebServices(){
const url = 'http://localhost:300/ping'
//Encadenar los datos de la url con la respuesta
fetch (url)
.then((response) => {
return response.json()//solicitar respuesta en formato json
})
.then((data)=> {
console.log(data)
message.innerHTML=data.message//asignar la data retornada al message
})
.catch(function(error){
console.log(error)
message.innerHTML='No se puede conectar al servidor ${url}'

})
}