import styled from 'styled-components'
import React from 'react'

export class Square extends React.PureComponent {
  render() {
    return <SquareContainer {...this.props} />
  }
}

const SquareContainer = styled.div.attrs(props => ({
  style: {
    left: `${props.x * props.pixelSize}px`,
    bottom: `${props.y * props.pixelSize}px`,
    backgroundImage: props.image ? `url(${props.image})` : 'none',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: props.color,
  },
}))`
  transition: bottom 0.5s linear;
  width: ${props => props.pixelSize}px;
  height: ${props => props.pixelSize}px;

  position: absolute;
`
