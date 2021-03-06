const turnDirection = {
  CLOCKWISE: 'clockwise',
  COUNTER_CLOCKWISE: 'counterClockwise',
}

const movementDirection = {
  LEFT: 'left',
  RIGHT: 'right',
  DOWN: 'down',
}

const orientation = {
  UP: 'up',
  RIGHT: 'right',
  DOWN: 'down',
  LEFT: 'left',
}

const shapeContainerSize = 4
const gameHeightInPixels = 18
const gameWidthInPixels = 10
const defaultPixelSize = 40
const colors = {
  black: '#262322',
  darkBrown: '#63372C',
  lightBrown: '#C97D60',
  pink: '#FFBCB5',
  puff: '#F2E5D7',
}
const shapeTemplates = [
  {
    id: 0,
    up: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 1,
      },
    ],
    right: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 0,
        y: 2,
      },
    ],
    down: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 2,
        y: 0,
      },
      {
        x: 2,
        y: 1,
      },
    ],
    left: [
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 1,
        y: 2,
      },
      {
        x: 0,
        y: 2,
      },
    ],
  },
  {
    id: 1,
    up: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 2,
        y: 0,
      },
    ],
    right: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 1,
        y: 2,
      },
    ],
    down: [
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 0,
      },
      {
        x: 2,
        y: 1,
      },
    ],
    left: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 0,
        y: 2,
      },
      {
        x: 1,
        y: 2,
      },
    ],
  },
  {
    id: 2,
    up: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 0,
      },
    ],
    right: [
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 1,
        y: 2,
      },
      {
        x: 0,
        y: 1,
      },
    ],
    down: [
      {
        x: 1,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 1,
      },
    ],
    left: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 0,
        y: 2,
      },
      {
        x: 1,
        y: 1,
      },
    ],
  },
  {
    id: 3,
    up: [
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 1,
      },
      {
        x: 3,
        y: 1,
      },
    ],
    right: [
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 1,
        y: 2,
      },
      {
        x: 1,
        y: 3,
      },
    ],
    down: [
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 1,
      },
      {
        x: 3,
        y: 1,
      },
    ],
    left: [
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 1,
        y: 2,
      },
      {
        x: 1,
        y: 3,
      },
    ],
  },
  {
    id: 4,
    up: [
      {
        x: 1,
        y: 0,
      },
      {
        x: 2,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
    ],
    right: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 1,
        y: 2,
      },
    ],
    down: [
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 2,
        y: 0,
      },
    ],
    left: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 1,
        y: 2,
      },
    ],
  },
  {
    id: 5,
    up: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 1,
      },
    ],
    right: [
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 0,
        y: 2,
      },
    ],
    down: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 1,
      },
    ],
    left: [
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 0,
        y: 2,
      },
    ],
  },
  {
    id: 6,
    up: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
    ],
    right: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
    ],
    down: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
    ],
    left: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 1,
        y: 1,
      },
    ],
  },
]

export const appConstants = {
  turnDirection,
  movementDirection,
  orientation,
  shapeContainerSize,
  colors,
  shapeTemplates,
  gameHeightInPixels,
  gameWidthInPixels,
  defaultPixelSize,
}
