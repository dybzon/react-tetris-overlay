import React from 'react'
import { appConstants } from '../../utilities'

export const SizeContext = React.createContext({})

export class SizeContextProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.getGameSize(),
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    return (
      <SizeContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </SizeContext.Provider>
    )
  }

  handleResize = () => this.setState({ ...this.getGameSize() })

  getGameSize = () => {
    const defaultWidth =
      appConstants.defaultPixelSize * appConstants.gameWidthInPixels
    const gameWidth =
      window.innerWidth < defaultWidth
        ? Math.floor(window.innerWidth / appConstants.gameWidthInPixels) *
          appConstants.gameWidthInPixels
        : defaultWidth
    const pixelSize = gameWidth / appConstants.gameWidthInPixels
    const gameHeight = pixelSize * appConstants.gameHeightInPixels
    return { gameWidth, pixelSize, gameHeight }
  }
}
