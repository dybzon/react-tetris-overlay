import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { appConstants } from '../utilities'

export class Shape extends React.PureComponent {
  render() {
    const { template, orientation, pixelSize, x, y, color } = this.props
    const squares = template[orientation]
    return (
      <ShapeContainer pixelSize={pixelSize} y={y} x={x}>
        <InnerContainer>
          {squares.map((sq, i) => (
            <Square
              key={i}
              pixelSize={pixelSize}
              y={sq.y}
              x={sq.x}
              color={color}
            />
          ))}
        </InnerContainer>
      </ShapeContainer>
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
