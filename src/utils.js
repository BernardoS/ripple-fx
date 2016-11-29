export function distance (p1, event) {
  // mozilla does not support x and y in event
  if (event.x === undefined) event.x = event.pageX
  if (event.y === undefined) event.y = event.pageY
  return Math.sqrt(Math.pow(event.x - p1.x, 2) + Math.pow(event.y - p1.y, 2))
}

// Clockwise
export function vertex ({top, bottom, left, right}) {
  return [{x: left, y: top}, {x: right, y: top}, {x: right, y: bottom}, {x: left, y: bottom}]
}

const POSITIONED_ELEMENT = {absolute: true, fixed: true, relative: true, sticky: true, static: false}
export function definePosition (element) {
  const {position} = getComputedStyle(element)
  if (!POSITIONED_ELEMENT[position]) {
    element.style.position = 'relative'
  }
}
