import {vertex, distance} from './utils'
import classnames from 'classnames'
const elementUrl = 'https://developer.mozilla.org/en-US/docs/Web/API/Element'
const eventUrl = 'https://developer.mozilla.org/en-US/docs/Web/API/Event'

export default function Ripple (target) {
  if (target instanceof Event) {
    if (target instanceof MouseEvent) this.fromMouseEvent(target)
    else this.fromElement(target.currentTarget)
  } else if (target instanceof Element) this.fromElement(target)
  else throw new TypeError(`argument 1 must be an Element (${elementUrl}) or an Event (${eventUrl})`)
}

Ripple.prototype = {
  fromMouseEvent (event) {
    const papa = event.currentTarget
    const ripple = document.createElement('span')
    const bounds = papa.getBoundingClientRect()
    const size = vertex(bounds).reduce((prevDist, point) => Math.max(prevDist, distance(point, event)), 0) * 0.2
    style(ripple)(size, event.pageY - bounds.top - (size / 2), event.pageX - bounds.left - (size / 2))
    ripple.addEventListener('transitionend', () => {
      try { papa.removeChild(ripple) } catch (e) {}
    }, false)
    papa.insertBefore(ripple, papa.firstChild)
    this.element = ripple
  },
  fromElement (papa) {
    const ripple = document.createElement('span')
    const size = Math.max(papa.offsetHeight, papa.offsetWidth) * 0.1
    style(ripple)(size, (papa.offsetHeight / 2) - (size / 2), (papa.offsetWidth / 2) - (size / 2))
    ripple.addEventListener('transitionend', () => {
      try { papa.removeChild(ripple) } catch (e) {}
    }, false)
    papa.insertBefore(ripple, papa.firstChild)
    this.element = ripple
  },
  get class () { return this.element.className },
  set class (classes) { this.element.className = classnames(classes) },
  animate (duration, opacity) {
    const style = this.element.style
    style.transition = `all ${duration}`
    style.transform = 'scale(10)'
    style.opacity = `${opacity}`
  }
}

function style (element) {
  return function (size, yPos, xPos) {
    const style = element.style
    style.top = `${yPos}px`
    style.left = `${xPos}px`
    style.height = `${size}px`
    style.width = `${size}px`
    style.userSelect = 'none'
    style.borderRadius = '50%'
    style.position = 'absolute'
  }
}
