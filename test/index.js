import './testando.scss'
import rippleFx from '../src'

// rippleFx.NAME = 'oi'
// rippleFx.restart()
// console.log(rippleFx)

window.onload = () => {
  setTimeout(function () {
    const teste1 = document.createElement('div')
    const teste2 = document.createElement('div')
    setTimeout(function () {
      teste1.setAttribute('oi', '')
      setTimeout(function () {
        teste1.removeAttribute('oi')
      }, 2000)
    }, 1000)
    teste1.classList.add('testing')
    teste2.setAttribute('oi', '')
    teste2.classList.add('testing')
    document.body.appendChild(teste1)
    document.body.appendChild(teste2)
  }, 1000)
}
