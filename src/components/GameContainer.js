import React from 'react'
import styled from 'styled-components'
import { GameEngine, SizeContext, SizeContextProvider } from './GameEngine'
import { Shape } from './Shape'
import { Squares } from './Squares'
import { GameDetails } from './GameDetails'

export class GameContainer extends React.PureComponent {
  render() {
    return (
      <GameEngine {...this.props}>
        <SizeContextProvider>
          <SizeContext.Consumer>
            {context => {
              const { gameWidth, gameHeight } = context
              return (
                <React.Fragment>
                  <GameDetails />
                  <Container height={gameHeight} width={gameWidth}>
                    <InnerContainer>
                      <Shape />
                      <Squares image={this.props.squareImage} />
                    </InnerContainer>
                  </Container>
                </React.Fragment>
              )
            }}
          </SizeContext.Consumer>
        </SizeContextProvider>
      </GameEngine>
    )
  }
}

const Container = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-left: 2px solid peachpuff;
  border-right: 2px solid peachpuff;
  z-index: 9999;
`

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
