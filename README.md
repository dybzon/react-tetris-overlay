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

## Game controls

a: left
s: down
d: right
w: turn clockwise
