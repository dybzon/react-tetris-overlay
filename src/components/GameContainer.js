import React from 'react'
import styled from 'styled-components'
import { GameEngine, GameContext } from './GameEngine'
import { Shape } from './Shape'
import { Square } from './Square'
import { GameDetails } from './GameDetails'

export class GameContainer extends React.PureComponent {
  render() {
    return (
      <GameEngine {...this.props}>
        <GameContext.Consumer>
          {context => {
            const {
              score,
              rowsCleared,
              gameOver,
              gameDetailsDisplay,
              onRestartGame,
              onQuit,
              gamePaused,
              pixelSize,
              shape,
              squares,
              gameWidth,
              gameHeight,
            } = context
            return (
              <React.Fragment>
                <GameDetails
                  score={score}
                  rowsCleared={rowsCleared}
                  gameOver={gameOver}
                  gameDetailsDisplay={gameDetailsDisplay}
                  onRestartGame={onRestartGame}
                  onQuit={onQuit}
                  paused={gamePaused}
                />
                <Container height={gameHeight} width={gameWidth}>
                  <InnerContainer>
                    {shape && (
                      <Shape pixelSize={pixelSize} key={shape.id} {...shape} />
                    )}
                    <React.Fragment>
                      {squares &&
                        squares.map(s => (
                          <Square
                            key={s.id}
                            {...s}
                            pixelSize={pixelSize}
                            image={this.props.squareImage}
                          />
                        ))}
                    </React.Fragment>
                  </InnerContainer>
                </Container>
              </React.Fragment>
            )
          }}
        </GameContext.Consumer>
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
