import {vertex, distance} from './utils'

let _name = 'ripple'
const root = {
  get name () { return _name },
  set name (newName) {
    if (typeof newName === 'string' && newName.trim()) _name = newName
  },
  add,
  remove,
  start,
  stop
}

const childList = new MutationObserver(function (mutations) {
  Array.from(mutations).forEach(mutation => Array.from(mutation.addedNodes).forEach(element => {
    if (element instanceof Element && element.hasAttribute(root.name)) {
      add(element, {center: element.getAttribute(root.name) === 'center'})
    }
  }))
})
const attributes = new MutationObserver(function (mutations) {
  Array.from(mutations).forEach(mutation => {
    const {target} = mutation
    if (target.hasAttribute(root.name)) {
      add(target, {center: target.getAttribute(root.name) === 'center'})
    } else remove(target)
  })
})

if (window.rippleFx !== false) {
  if (document.readyState === 'complete') ready()
  else window.addEventListener('load', ready)

  childList.observe(document.body, {childList: true, subtree: true})
  attributes.observe(document.body, {attributes: true, subtree: true, attributeFilter: [root.name]})
}

function ready () {
  Array.from(document.querySelectorAll(`[${root.name}]`)).forEach(element => add(element, {center: element.getAttribute(root.name) === 'center'}))
}

function stylingRipple ({style}, size, yPos, xPos) {
  style.top = `${yPos}px`
  style.left = `${xPos}px`
  style.height = `${size}px`
  style.width = `${size}px`
  style.userSelect = 'none'
  style.borderRadius = '50%'
  style.position = 'absolute'
  style.transition = 'all 1s'
}

function stylingRippleContainer ({style}, {top, left, width, height}) {
  style.height = `${height}px`
  style.width = `${width}px`
  style.top = `${top}px`
  style.left = `${left}px`
  style.position = 'absolute'
  style.overflow = 'hidden'
  style.display = 'inline-block'
  style.userSelect = 'none'
}

function ripple (event) {
  event.preventDefault()
  const ripple = document.createElement('div')
  const bounds = this.getBoundingClientRect()
  const size = vertex(bounds).reduce((prevDist, point) => Math.max(prevDist, distance(point, event)), 0) * 0.2
  stylingRipple(ripple, size, event.pageY - this.offsetTop - (size / 2), event.pageX - this.offsetLeft - (size / 2))
  ripple.classList.add(root.name)
  ripple.addEventListener('transitionend', () => {
    try { this.removeChild(ripple) } catch (e) {}
  }, false)
  this.appendChild(ripple)
  requestAnimationFrame(_ => requestAnimationFrame(_ => {
    ripple.style.transform = 'scale(10)'
    ripple.style.opacity = '0'
  }))
}

function centerRipple (event) {
  event.preventDefault()
  const ripple = document.createElement('div')
  const size = Math.max(this.offsetHeight, this.offsetWidth) * 0.1

  stylingRipple(ripple, size, (this.offsetHeight / 2) - (size / 2), (this.offsetWidth / 2) - (size / 2))
  ripple.classList.add(root.name)

  ripple.addEventListener('transitionend', () => {
    try { this.removeChild(ripple) } catch (e) {}
  }, false)
  this.appendChild(ripple)
  requestAnimationFrame(_ => requestAnimationFrame(_ => {
    ripple.style.transform = 'scale(10)'
    ripple.style.opacity = '0'
  }))
}

export function stop () {
  childList.disconnect()
  attributes.disconnect()
}

export function start () {
  childList.observe(document.body, {childList: true, subtree: true})
  attributes.observe(document.body, {attributes: true, subtree: true, attributeFilter: [root.name]})
}

/*
  {center: Boolean}
*/
function elementToObject (element) {
  const props = element.getAttribute(root.name).trim().split(/, |,| /)
  if (!props[0]) return {center: false, event: 'onclick'}
}
export function add (element, {center = false}) {
  elementToObject(element)
  const container = document.createElement('span')
  // const shadow = element.createShadowRoot()
  container.classList.add(`${root.name}-container`)
  stylingRippleContainer(container, element.getBoundingClientRect())
  element.insertBefore(container, element.firstChild)
  container.onclick = center ? centerRipple : ripple
  const observer = new MutationObserver(function (mutations) {
    stylingRippleContainer(container, element.getBoundingClientRect())
  })
  observer.observe(element, {attributes: true, subtree: true})
}

export function remove (rippler) {
  const container = rippler.getElementsByClassName(`${root.name}-container`)
  if (container.length) container[0].remove()
}
export default root
