export function distance (p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
}

// Clockwise
export function vertex ({top, bottom, left, right}) {
  return [{x: left, y: top}, {x: right, y: top}, {x: right, y: bottom}, {x: left, y: bottom}]
}

// const flatMap = (array) => Array.prototype.concat.apply([], array)
