import React, { createContext, Component } from 'react'
import { getShape } from './shapeCreator'
import {
  appConstants,
  getOrientationAfterTurn,
  canMove,
  canTurn,
  getCoordinatesFromShape,
} from '../../utilities'

const defaultGameDetailsDisplay = {
  score: true,
  rowsCleared: true,
  quit: true,
  controls: true,
}

const defaultState = {
  shape: undefined,
  squares: undefined,
  gameOver: false,
  gamePaused: false,
  score: 0,
  rowsCleared: 0,
}

export const GameContext = createContext({})

export class GameEngine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...defaultState,
      shape: getShape(0),
    }
  }

  actionHandlers = [
    {
      key: 65,
      action: () => this.moveLeft(),
    },
    {
      key: 68,
      action: () => this.moveRight(),
    },
    {
      key: 83,
      action: () => this.moveDown(),
    },
    {
      key: 87,
      action: () => this.turn(appConstants.turnDirection.CLOCKWISE),
    },
    {
      key: 37,
      action: () => this.moveLeft(),
    },
    {
      key: 39,
      action: () => this.moveRight(),
    },
    {
      key: 40,
      action: () => this.moveDown(),
    },
    {
      key: 38,
      action: () => this.turn(appConstants.turnDirection.CLOCKWISE),
    },
    {
      key: 32,
      action: () => this.toggleGamePaused(),
    },
  ]

  componentDidMount() {
    this.interval = setInterval(this.advanceGame, 500)
    document.addEventListener('keydown', this.handleKeydown)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    document.removeEventListener('keydown', this.handleKeydown)
  }

  render() {
    return (
      <GameContext.Provider
        value={{
          ...this.state,
          onRestartGame: this.handleGameRestart,
          onQuit: this.handleGameQuit,
          gameDetailsDisplay: this.props.gameDetailsDisplay
            ? this.props.gameDetailsDisplay
            : defaultGameDetailsDisplay,
        }}>
        {this.props.children}
      </GameContext.Provider>
    )
  }

  advanceGame = () => {
    const { gameOver, gamePaused, shape, squares } = this.state
    if (gameOver || gamePaused) return
    if (!canMove(shape, squares, appConstants.movementDirection.DOWN)) {
      this.spawnShape()
      this.cleanUpSquares()
      if (this.isGameOver()) this.handleGameOver()
      return
    }

    // Move the active shape one pixel down
    shape.y--
    this.setState({ shape })
  }

  handleKeydown = e => {
    const handler = this.actionHandlers.find(a => a.key === e.keyCode)
    if (handler && handler.action) handler.action()
  }

  // Use this instead of moveLeft, moveRight, moveDown
  move = (direction, xDiff, yDiff) => {
    if (!canMove(this.state.shape, this.state.squares, direction)) return
    const shape = this.state.shape
    shape.x = shape.x + xDiff
    shape.y = shape.y + yDiff
    this.setState({ shape })
  }

  moveLeft = () => {
    if (
      !canMove(
        this.state.shape,
        this.state.squares,
        appConstants.movementDirection.LEFT
      )
    )
      return
    const shape = this.state.shape
    shape.x--
    this.setState({ shape })
  }

  moveRight = () => {
    if (
      !canMove(
        this.state.shape,
        this.state.squares,
        appConstants.movementDirection.RIGHT
      )
    )
      return
    const shape = this.state.shape
    shape.x++
    this.setState({ shape })
  }

  moveDown = () => {
    if (
      !canMove(
        this.state.shape,
        this.state.squares,
        appConstants.movementDirection.DOWN
      )
    )
      return
    const shape = this.state.shape
    shape.y--
    this.setState({ shape })
  }

  turn = direction => {
    if (!canTurn(this.state.shape, this.state.squares, direction)) return
    const shape = this.state.shape
    shape.orientation = getOrientationAfterTurn(direction, shape.orientation)
    this.setState({ shape })
  }

  spawnShape = () => {
    const newShapeId =
      this.state.shape && typeof this.state.shape.id === 'number'
        ? this.state.shape.id + 1
        : 0
    const shape = getShape(newShapeId)
    const squares = this.state.squares ? this.state.squares : []
    squares.push(...this.getSquaresForShape(this.state.shape))
    this.setState({ shape, squares })
  }

  getSquaresForShape = shape => {
    const squares = getCoordinatesFromShape(shape)
    squares.forEach((s, i) => {
      s.color = shape.color
      s.id = `sh${shape.id}-sq${i}`
    })
    return squares
  }

  // Remove squares on full rows, and move above rows down
  cleanUpSquares = () => {
    let squareCountsPerRow = this.getSquareCountsPerRow(this.state.squares)
    let squares = this.state.squares
    let score = 0
    let rowsCleared = 0
    squareCountsPerRow
      .filter(sc => sc.count >= 10)
      .sort((a, b) => b.y - a.y)
      .forEach(sc => {
        squares = squares.reduce((result, square) => {
          if (square.y !== sc.y) result.push(square)
          if (square.y > sc.y) square.y--
          return result
        }, [])
        rowsCleared++
        score = score * 3 + 100
      })

    if (rowsCleared) {
      this.setState({
        squares,
        rowsCleared: this.state.rowsCleared + rowsCleared,
        score: this.state.score + score,
      })
    }
  }

  getSquareCountsPerRow = squares =>
    squares.reduce((result, square) => {
      let rowCount = result.find(r => r.y === square.y)
      if (rowCount) {
        rowCount.count++
      } else {
        rowCount = { y: square.y, count: 1 }
        result.push(rowCount)
      }
      return result
    }, [])

  isGameOver = () => {
    return (
      Math.max(...this.state.squares.map(s => s.y)) >=
      appConstants.gameHeightInPixels - 1
    )
  }

  toggleGamePaused = () => this.setState({ gamePaused: !this.state.gamePaused })

  handleGameOver = () => {
    this.setState({ gameOver: true })
  }

  handleGameRestart = () => {
    this.setState({ ...defaultState, shape: getShape(0) })
  }

  handleGameQuit = () => {
    this.props.onQuit && this.props.onQuit()
  }
}
