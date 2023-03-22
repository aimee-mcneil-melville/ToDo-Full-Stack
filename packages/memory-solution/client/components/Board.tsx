/* eslint-disable no-unused-vars */
import * as React from 'react'
import Tile from './Tile'
import { TileData } from '../startingTiles'
import { useState } from 'react'

type Props = {
  tiles: TileData[]
  setTiles: React.Dispatch<React.SetStateAction<TileData[]>>
  evalMatch: (tile1: TileData, tile2: TileData) => void
}

function Board(props: Props) {
  const [guessedTile, setGuessedTile] = useState<TileData | null>(null)

  const [isDisabled, setIsDisabled] = useState(false)

  function handleClick(tile: TileData) {
    if (isDisabled) return
    if (tile.isVisible) return

    toggleTile(tile.id, true)

    if (!guessedTile) {
      setGuessedTile(tile)
    } else {
      props.evalMatch(guessedTile, tile)
      if (guessedTile.value === tile.value) {
        setGuessedTile(null)
      } else {
        setIsDisabled(true)
        setTimeout(() => {
          toggleTile(guessedTile.id, false)
          console.log('tile', tile)
          console.log('guessedTile', guessedTile)
          toggleTile(tile.id, false)
          setGuessedTile(null)
          setIsDisabled(false)
        }, 1000)
      }
    }
  }

  function toggleTile(tileId: number, shouldBeVisible: boolean) {
    props.setTiles((prevTiles) => {
      return prevTiles.map((tile) => {
        if (tile.id === tileId) {
          return {
            ...tile,
            isVisible: shouldBeVisible,
          }
        }
        return tile
      })
    })
  }

  return (
    <div className="tiles" data-testid="Board">
      {props.tiles.map((tile) => {
        return <Tile onClick={handleClick} key={tile.id} tile={tile} />
      })}
    </div>
  )
}

export default Board
