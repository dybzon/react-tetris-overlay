import styled from 'styled-components'
import React from 'react'
import { SizeContext } from './GameEngine'

export class Square extends React.PureComponent {
  render() {
    return (
      <SizeContext.Consumer>
        {context => <SquareContainer {...this.props} {...context} />}
      </SizeContext.Consumer>
    )
  }
}

const SquareContainer = styled.div.attrs(props => ({
  style: {
    left: `${props.x * props.pixelSize}px`,
    bottom: `${props.y * props.pixelSize}px`,
    backgroundImage: props.image ? `url(${props.image})` : 'none',
    backgroundSize: `${props.gameWidth}px ${props.gameHeight}px`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: `${-props.x * props.pixelSize}px ${-props.gameHeight +
      props.y * props.pixelSize}px `,
    backgroundColor: props.color,
  },
}))`
  transition: bottom 0.5s linear;
  width: ${props => props.pixelSize}px;
  height: ${props => props.pixelSize}px;
  overflow: hidden;

  position: absolute;
`
