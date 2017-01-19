import './ripple-fx.html'
import Ripple from './Ripple'
import {definePosition} from './utils'
let NAME = 'ripple'

export function polyfill (newName = NAME) {
  window[newName] = ripple
  NAME = newName
}

export default function ripple (target, classes, {duration = '1s', opacity = 0} = {}) {
  const element = target.currentTarget
  if (element instanceof Element) {
    definePosition(element)
    Array.from(element.children).forEach(definePosition)
  }
  const ripple = new Ripple(target)
  ripple.class = classes
  // console.log(ripple)
  requestAnimationFrame(_ => requestAnimationFrame(_ => ripple.animate(duration, opacity)))
}
