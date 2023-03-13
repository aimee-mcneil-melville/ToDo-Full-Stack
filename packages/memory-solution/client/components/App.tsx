import Board from './Board'
import startingTiles, { TileData } from '../startingTiles'
import { useState } from 'react'

const tryAgain = 'No match, try again'
const winMessage = 'Congratulations, you matched all the tiles!'
const numMatchesToWin = startingTiles.length / 2

function App() {
  const [matchCount, setMatchCount] = useState(0)
  const [isMatch, setIsMatch] = useState(false)
  const [tiles, setTiles] = useState(() =>
    startingTiles.map((tile) => ({ ...tile, isVisible: false }))
  )

  console.log(tiles)

  const hasWon = matchCount === numMatchesToWin

  const reset = () => {
    setMatchCount(0)
    setIsMatch(false)
    setTiles(() => {
      return startingTiles.map((tile) => ({ ...tile, isVisible: false }))
    })
  }

  const evalMatch = (tile1: TileData, tile2: TileData) => {
    if (tile1.value === tile2.value) {
      setMatchCount(matchCount + 1)
      setIsMatch(true)
    } else {
      setIsMatch(false)
    }
  }

  return (
    <div className="game">
      <h1>Welcome to the Memory Game</h1>
      <h2>Match all the tiles to win</h2>
      <p>Matches left: {numMatchesToWin - matchCount}</p>

      <Board setTiles={setTiles} tiles={tiles} evalMatch={evalMatch} />

      <h5>{hasWon && winMessage}</h5>
      <h5>{!isMatch && tryAgain}</h5>

      <div className="replaybutton">
        {hasWon && <button onClick={reset}>Play Again</button>}
      </div>
    </div>
  )
}

export default App
