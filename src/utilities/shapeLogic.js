import { appConstants } from './appConstants'

// Gets the lower limit (on the Y-axis) to which a shape can move, given its shape template and orientation
function getLowerMovementLimit(shapeTemplate, orientation) {
  const squares = shapeTemplate[orientation]
  const lowestSquareY = Math.max(...squares.map(sq => sq.y)) // Lowest as in closest to the bottom of the screen
  return lowestSquareY - appConstants.shapeContainerSize + 1
}

// Gets the lower limit (on the X-axis) to which a shape can move, given its shape template and orientation
function getLeftMovementLimit(shapeTemplate, orientation) {
  const squares = shapeTemplate[orientation]
  const lowestSquareX = Math.min(...squares.map(sq => sq.x))
  return -lowestSquareX
}

// Gets the upper limit (on the X-axis) to which a shape can move, given its shape template and orientation
function getRightMovementLimit(shapeTemplate, orientation) {
  const squares = shapeTemplate[orientation]
  const highestSquareX = Math.max(...squares.map(sq => sq.x))
  return appConstants.gameWidthInPixels - highestSquareX - 1
}

/**
 * Determines whether the active shape will overlap
 * any of the inactive squares if it's moved in the given direction.
 * @param {The shape to be moved} shape
 * @param {The squares currently in play} squares
 * @param {The direction to move the shape} movementDirection
 */
function willOverlapOnMove(shape, squares, movementDirection) {
  let yDiff = 0
  let xDiff = 0
  switch (movementDirection) {
    case appConstants.movementDirection.DOWN:
      yDiff = -1
      break
    case appConstants.movementDirection.LEFT:
      xDiff = -1
      break
    case appConstants.movementDirection.RIGHT:
      xDiff = 1
      break
    default:
    // no default
  }

  return willOverlapOnDiff(shape, squares, xDiff, yDiff)
}

/**
 * Determines whether it's possible (valid) to move
 * the currently active shape in the given direction.
 * @param {The shape to be moved} shape
 * @param {The squares in play} squares
 * @param {The direction to move the shape} movementDirection
 */
export function canMove(shape, squares, movementDirection) {
  if (!shape) return false

  let result = true

  // Check whether the shape will overlap any squares
  if (squares && willOverlapOnMove(shape, squares, movementDirection))
    result = false

  // Check whether any coordinates of the shape will leave the "game board"
  switch (movementDirection) {
    case appConstants.movementDirection.DOWN:
      if (shape.y <= getLowerMovementLimit(shape.template, shape.orientation))
        result = false
      break
    case appConstants.movementDirection.LEFT:
      if (shape.x <= getLeftMovementLimit(shape.template, shape.orientation))
        result = false
      break
    case appConstants.movementDirection.RIGHT:
      if (shape.x >= getRightMovementLimit(shape.template, shape.orientation))
        result = false
      break
    default:
    // not default
  }

  return result
}

/**
 * Determines whether the given shape will overlap
 * any inactive squares if it's turned in the given direction.
 * @param {The shape to be turned} shape
 * @param {The squares in play} squares
 * @param {The direction to turn the active shape} turnDirection
 */
export function willOverlapOnTurn(shape, squares, turnDirection) {
  // Get square coordinates of shape after turn
  if (!shape) return false
  const newOrientation = getOrientationAfterTurn(
    turnDirection,
    shape.orientation
  )
  const coordinates = shape.template[newOrientation].map(s => ({
    x: shape.x + s.x,
    y: shape.y + appConstants.shapeContainerSize - s.y - 1,
  }))
  return doCoordinatesOverlap(coordinates, squares)
}

/**
 * Determines whether it's possible (valid) to turn
 * the given shape in the given direction.
 * @param {The shape to be turned} shape
 * @param {The squares in play} squares
 * @param {The direction to turn the shape} turnDirection
 */
export function canTurn(shape, squares, turnDirection) {
  if (!shape) return false

  let result = true

  // Check whether the shape will overlap any of the inactive squares
  if (willOverlapOnTurn(shape, squares, turnDirection)) result = false

  // Check whether any coordinates of the shape will leave the "game board"
  const newOrientation = getOrientationAfterTurn(
    turnDirection,
    shape.orientation
  )
  if (shape.y < getLowerMovementLimit(shape.template, newOrientation))
    result = false
  if (shape.x < getLeftMovementLimit(shape.template, newOrientation))
    result = false
  if (shape.x > getRightMovementLimit(shape.template, newOrientation))
    result = false

  return result
}

/**
 * Returns a value indicating whether the currently active shape
 * will overlap any inactive shape when moved the given xDiff and
 * yDiff pixels.
 *
 * It's important to note that the y axis for the shape
 * has its origin (0) at the bottom line of the window.
 * The y axis for the squares within the shape has its
 * origin at the top line of the shape container.
 *
 * @param {The shape to be moved} shape
 * @param {The squares in play} squares
 * @param {The difference to move the shape on the x-axis} xDiff
 * @param {The difference to move the shape on the y-axis} yDiff
 */
function willOverlapOnDiff(shape, squares, xDiff, yDiff) {
  if (!shape) return false

  // Get the square coordinates of the current shape after next increment
  const activeCoordinatesAfterIncrement = getCoordinatesFromShape(
    shape,
    xDiff,
    yDiff
  )
  return doCoordinatesOverlap(activeCoordinatesAfterIncrement, squares)
}

function doCoordinatesOverlap(coords, otherCoords) {
  if (!otherCoords || !coords || !otherCoords.length || !coords.length)
    return false
  return coords.some(c => otherCoords.some(oc => oc.x === c.x && oc.y === c.y))
}

export function getCoordinatesFromShape(shape, xAdd, yAdd) {
  let xDiff = xAdd ? xAdd : 0
  let yDiff = yAdd ? yAdd : 0
  return shape.template[shape.orientation].map(s => ({
    x: shape.x + s.x + xDiff,
    y: shape.y + appConstants.shapeContainerSize - s.y - 1 + yDiff,
  }))
}

/**
 * Gets the new orientation of an object after turning in a given direction.
 * @param {The direction to turn} turnDirection
 * @param {The current orientation} currentOrientation
 */
export function getOrientationAfterTurn(turnDirection, currentOrientation) {
  const ori = appConstants.orientation
  const dir = appConstants.turnDirection
  const directionOrientationMapping = [
    {
      key: dir.CLOCKWISE,
      value: [
        {
          key: ori.UP,
          value: ori.RIGHT,
        },
        {
          key: ori.RIGHT,
          value: ori.DOWN,
        },
        {
          key: ori.DOWN,
          value: ori.LEFT,
        },
        {
          key: ori.LEFT,
          value: ori.UP,
        },
      ],
    },
    {
      key: dir.COUNTER_CLOCKWISE,
      value: [
        {
          key: ori.UP,
          value: ori.LEFT,
        },
        {
          key: ori.RIGHT,
          value: ori.UP,
        },
        {
          key: ori.DOWN,
          value: ori.RIGHT,
        },
        {
          key: ori.LEFT,
          value: ori.DOWN,
        },
      ],
    },
  ]
  return directionOrientationMapping
    .find(d => d.key === turnDirection)
    .value.find(o => o.key === currentOrientation).value
}
