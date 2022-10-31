import type { MouseEvent } from 'react'
import { TTile } from '../startingTiles'

type Props = TTile & {
  onClick: (evt: MouseEvent<HTMLButtonElement>) => void
}

function Tile(props: Props) {
  return (
    <button className="tile" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

export default Tile
