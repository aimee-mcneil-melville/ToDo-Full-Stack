/* eslint-disable no-unused-vars */

import { TTile } from '../startingTiles'

type Props = {
  onClick: (tile: TTile) => void
  tile: TTile
}

function Tile(props: Props) {
  return (
    <button className="tile" onClick={() => props.onClick(props.tile)}>
      {props.tile.isVisible && props.tile.value}
    </button>
  )
}

export default Tile
