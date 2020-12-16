import React, { useState } from 'react'

import Board from './Board'
import startingTiles from '../startingTiles'

const tryAgain = 'No match, try again'
const winMessage = 'Congratulations, you matched all the tiles!'

function App (props) {

  const [isMatch, setIsMatch] = useState(false)
  const [matchCount, setMatchCount] = useState(0)
  const [tiles, setTiles] = useState(startingTiles)

  const hasWon = matchCount === (startingTiles.length / 2)

  const reset = () => {
    const newTiles = startingTiles.map(tile => {
      tile.isVisible = false
      return tile
    })

    setMatchCount(0)
    setTiles(newTiles)
    setIsMatch(true)
  }

  const  evalMatch = (tile1, tile2) => {
    const isMatch = tile1.value === tile2.value
    const updatedTiles = tiles.map(tile => {
      if (!isMatch && (tile === tile1 || tile === tile2)) {
        tile.isVisible = false
      }
      return tile
    })
    setMatchCount(isMatch ? matchCount + 1 : matchCount)
    setTiles(updatedTiles)
    setIsMatch(isMatch)
  }

  return (
    <div className='game'>
      <h1>Welcome to the Memory Game</h1>
      <h2>Match all the tiles to win</h2>

      <Board tiles={startingTiles} evalMatch={evalMatch} />

      <h5>{hasWon && winMessage}</h5>
      <h5>{!isMatch && tryAgain}</h5>

      <div className='replaybutton'>
        {hasWon && <button onClick={reset}>Play Again</button>}
      </div>
    </div>
  )
}

export default App
