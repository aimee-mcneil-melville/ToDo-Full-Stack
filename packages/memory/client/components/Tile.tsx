import { TTile } from '../startingTiles'

type Props = TTile

function Tile(props: Props) {
  return <div className="tile">{props.value}</div>
}

export default Tile
