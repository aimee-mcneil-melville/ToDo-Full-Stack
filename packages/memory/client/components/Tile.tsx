import { TileData } from '../startingTiles'

interface Props extends TileData {
  // include additional props here
}

function Tile(props: Props) {
  return <div className="tile">{props.value}</div>
}

export default Tile
