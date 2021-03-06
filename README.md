# react-tetris-overlay

A React component that renders a tetris game.

The tetris game will be rendered on top of any other elements, but will not stop the user from interacting with elements in the background.

The component is intended for usage on desktop only. I.e. it is not well suited for mobile devices.

# Installation

```
npm i react-tetris-overlay --save
```

# Usage

Import the tetris component and render it anywhere in your application:

```
// Import the tetris component
import Tetris from 'react-tetris-overlay';
...

// Render it
render() {
  return <Tetris />
}
```

## Customization

The `<Tetris />` component takes a few optional props with the following default values:

```
gameDetailsDisplay = {
  score: true, // Determines whether the score is displayed
  rowsCleared: true, // Determines whether the number of rows cleared is displayed
  quit: true, // Determines whether the quit button is displayed
  controls: true, // Determines whether game controls are displayed
}
onQuit = undefined // Callback function to handle the event that is fired when the quit button is clicked
squareImage = undefined // An image to be displayed on the squares that have "landed" on the game board. The optimal resolution for this image is 720 h x 400 w
```

## Game controls

a: left
s: down
d: right
w: turn clockwise
space: pause game
