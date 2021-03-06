import { appConstants } from '../../utilities'

export function getShape(id) {
  return {
    active: true,
    x: Math.floor(appConstants.gameWidthInPixels / 2),
    y: appConstants.gameHeightInPixels - appConstants.shapeContainerSize,
    orientation: appConstants.orientation.UP,
    color: randomColor(),
    template:
      appConstants.shapeTemplates[
        Math.floor(Math.random() * appConstants.shapeTemplates.length)
      ],
    id,
  }
}

function randomColor() {
  return randomProperty(appConstants.colors)
}

function randomProperty(obj) {
  const keys = Object.keys(obj)
  return obj[keys[Math.floor(keys.length * Math.random())]]
}
