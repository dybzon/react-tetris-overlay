import styled from 'styled-components'
import React from 'react'
import { SizeContext } from './GameEngine'

export class Square extends React.PureComponent {
  render() {
    return (
      <SizeContext.Consumer>
        {context => (
          <SquareContainer {...this.props} pixelSize={context.pixelSize} />
        )}
      </SizeContext.Consumer>
    )
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
    clipPath: `inset(0px 0px 0px 0px)`,
  },
}))`
  transition: bottom 0.5s linear;
  width: ${props => props.pixelSize}px;
  height: ${props => props.pixelSize}px;

  position: absolute;
`
