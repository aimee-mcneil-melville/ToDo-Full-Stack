import { TileData } from '../startingTiles'

interface Props extends TileData {
  // include additional props here
}

function Tile(props: Props) {
  return <button className="tile">{props.value}</button>
}

export default Tile
