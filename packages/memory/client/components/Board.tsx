import Tile from './Tile'
import type { TTile } from '../startingTiles'

type Props = {
  tiles: TTile[]
  evalMatch: () => void
}

function Board(props: Props) {
  return (
    <div className="tiles" data-testid="Board">
      {props.tiles.map((tile) => {
        return (
          <Tile
            id={tile.id}
            key={tile.id}
            info={tile.info}
            value={tile.value}
            isVisible={tile.isVisible}
          />
        )
      })}
    </div>
  )
}

export default Board
