import React from 'react'
import { Square } from './Square'
import { GameContext } from './GameEngine'

export class Squares extends React.Component {
  render() {
    return (
      <GameContext.Consumer>
        {context =>
          context.squares
            ? context.squares.map(s => (
                <Square key={s.id} {...s} image={this.props.image} />
              ))
            : ''
        }
      </GameContext.Consumer>
    )
  }
}
