import {vertex, distance} from './utils'

const root = {
  name: 'ripple-fx',
  add,
  remove,
  restart,
  stop
}

if (document.readyState === 'complete') ready()
else window.addEventListener('load', ready)

function ready () {
  document.querySelectorAll(`[${root.name}]`).forEach(element => add(element, {center: element.getAttribute(root.name) === 'center'}))
}

const childList = new MutationObserver(function (mutations) {
  mutations.forEach(mutation => mutation.addedNodes.forEach(element => {
    if (element instanceof Element && element.hasAttribute(root.name)) {
      add(element, {center: element.getAttribute(root.name) === 'center'})
    }
  }))
})
const attributes = new MutationObserver(function (mutations) {
  mutations.forEach(mutation => {
    const {target} = mutation
    if (target.hasAttribute(root.name)) {
      add(target, {center: target.getAttribute(root.name) === 'center'})
    } else remove(target)
  })
})

const options = {
  childList: () => ({childList: true, subtree: true}),
  attributes: () => ({attributes: true, subtree: true, attributeFilter: [root.name]})
}
childList.observe(document.body, options.childList())
attributes.observe(document.body, options.attributes())

export function stop () {
  childList.disconnect()
  attributes.disconnect()
}

export function restart () {
  childList.observe(document.body, options.childList())
  attributes.observe(document.body, options.attributes())
}

export function add (element, {center = false}) {
  element.style.position = 'relative'
  const container = document.createElement('div')
  container.classList.add(`${root.name}-container`)
  container.style.height = `${element.offsetHeight}px`
  container.style.width = `${element.offsetWidth}px`
  container.style.position = 'absolute'
  container.style.top = '0px'
  container.style.left = '0px'
  container.style.overflow = 'hidden'
  container.style.display = 'inline-block'
  container.style.userSelect = 'none'
  element.insertBefore(container, element.firstChild)
  container.onclick = center ? createCenterRipple : createRipple
}

export function remove (rippler) {
  const container = rippler.getElementsByClassName(`${root.name}-container`)
  if (container.length) container[0].remove()
}

function createRipple (event) {
  event.preventDefault()
  const ripple = document.createElement('div')
  const bounds = this.offsetParent.getBoundingClientRect()
  const size = vertex(bounds).reduce((prevDist, point) => Math.max(prevDist, distance(point, event)), 0) * 0.2
  ripple.style.top = `${event.pageY - this.offsetParent.offsetTop - (size / 2)}px`
  ripple.style.left = `${event.pageX - this.offsetParent.offsetLeft - (size / 2)}px`
  ripple.style.height = size + 'px'
  ripple.style.width = size + 'px'
  ripple.classList.add(root.name)
  ripple.addEventListener('animationend', () => this.removeChild(ripple), false)
  this.appendChild(ripple)
}
function createCenterRipple (event) {
  event.preventDefault()
  const ripple = document.createElement('div')
  const size = Math.max(this.offsetHeight, this.offsetWidth) * 0.1
  ripple.style.top = `${(this.offsetHeight / 2) - (size / 2)}px`
  ripple.style.left = `${(this.offsetWidth / 2) - (size / 2)}px`
  ripple.style.height = size + 'px'
  ripple.style.width = size + 'px'
  ripple.classList.add(root.name)
  ripple.addEventListener('animationend', () => this.removeChild(ripple), false)
  this.appendChild(ripple)
}

export default root
