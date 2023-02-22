import { useAppSelector } from '../hooks'
import Aardvark from './Aardvark'

function Aardvarks() {
  const aardvarks = useAppSelector((state) => state.aardvarks)

  return (
    <div>
      <h1>Aardvarks</h1>
      <ul>
        {aardvarks.map((aardvark) => (
          <li key={aardvark}>
            <Aardvark name={aardvark} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Aardvarks
