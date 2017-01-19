import './testando.scss'
import {polyfill} from '../src'
polyfill()

if (module.hot) module.hot.accept()

// rippleFx.NAME = 'oi'
// rippleFx.start()
// console.log(rippleFx)

// window.onload = () => {
//   setTimeout(function () {
//     const teste1 = document.createElement('div')
//     const teste2 = document.createElement('div')
//     setTimeout(function () {
//       teste1.setAttribute('ripple', '')
//       setTimeout(function () {
//         teste1.removeAttribute('ripple')
//       }, 2000)
//     }, 1000)
//     teste1.classList.add('testing')
//     teste2.setAttribute('ripple', '')
//     teste2.classList.add('testing')
//     document.body.appendChild(teste1)
//     document.body.appendChild(teste2)
//   }, 1000)
// }
