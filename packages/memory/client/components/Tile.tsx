export interface Props {
  info: string
  isVisible: boolean
  value: string
  id: number
}

function Tile(props: Props) {
  return <div className="tile">{props.value}</div>
}

export default Tile
