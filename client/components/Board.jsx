import React from 'react'

import Tile from './Tile'

class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tile1: null,
      tile2: null
    }
    this.checkMatch = this.checkMatch.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (id) {
    const {tile1} = this.state
    const tile = this.props.tiles.find(tile => tile.id === id)
    tile.isVisible = true

    // if the first tile is being flipped
    if (tile1 === null) {
      this.setState({
        tile1: tile
      })
      return
    }

    // if the second tile is being flipped
    this.setState({
      tile2: tile
    }, this.checkMatch)
  }

  checkMatch () {
    const {tiles} = this.props
    const {tile1, tile2} = this.state
    const isMatch = tile1.value === tile2.value

    const reportMatch = (newTiles = tiles) => {
      this.setState({
        tile1: null,
        tile2: null
      })
      this.props.foundMatch(isMatch)
    }

    const flipOverUnmatchedTiles = () => {
      const newTiles = tiles.map(tile => {
        if ((tile === tile1) || (tile === tile2)) {
          tile.isVisible = false
        }
        return tile
      })

      reportMatch(newTiles)
    }

    // look for a match
    if (isMatch) {
      reportMatch()
    } else {
      setTimeout(flipOverUnmatchedTiles, 1000)
    }
  }

  render () {
    return <div className='tiles'>
      {this.props.tiles.map(tile => {
        return <Tile
          key={tile.id}
          info={tile.info}
          value={tile.value}
          isVisible={tile.isVisible}
          handleClick={this.handleClick.bind(this, tile.id)} />
      })}
    </div>
  }
}

export default Board
