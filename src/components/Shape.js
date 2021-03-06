import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { appConstants } from '../utilities'
import { SizeContext, GameContext } from './GameEngine'

export class Shape extends React.PureComponent {
  render() {
    return (
      <SizeContext.Consumer>
        {sizeContext => (
          <GameContext.Consumer>
            {gameContext => {
              const { shape } = gameContext
              if (!shape) return ''

              const { template, orientation, x, y, color } = shape
              const { pixelSize } = sizeContext
              const squares = template[orientation]
              return (
                <ShapeContainer pixelSize={pixelSize} y={y} x={x}>
                  <InnerContainer>
                    {squares.map((sq, i) => (
                      <Square
                        key={i}
                        y={sq.y}
                        x={sq.x}
                        color={color}
                        pixelSize={pixelSize}
                      />
                    ))}
                  </InnerContainer>
                </ShapeContainer>
              )
            }}
          </GameContext.Consumer>
        )}
      </SizeContext.Consumer>
    )
  }
}

const ShapeContainer = styled.div.attrs(props => ({
  style: {
    width: `${appConstants.shapeContainerSize * props.pixelSize}px`,
    height: `${appConstants.shapeContainerSize * props.pixelSize}px`,
    bottom: `${props.y * props.pixelSize}px`,
    left: `${props.x * props.pixelSize}px`,
  },
}))`
  position: absolute;
`

const InnerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Square = styled.div`
  width: ${props => props.pixelSize}px;
  height: ${props => props.pixelSize}px;
  background: ${props => props.color};
  position: absolute;
  top: ${props => props.y * props.pixelSize}px;
  left: ${props => props.x * props.pixelSize}px;
`

Shape.propTypes = {
  pixelSize: PropTypes.number,
  y: PropTypes.number,
  x: PropTypes.number,
}
