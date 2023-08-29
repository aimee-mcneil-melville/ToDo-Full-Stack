import { useAppSelector } from '../hooks.ts'
import Wombat from './Wombat.tsx'

function Wombats() {
  const wombats = useAppSelector((state) => state.wombats)

  return (
    <div>
      <h1>Wombats</h1>
      <ul>
        {wombats.map((wombat) => (
          <li key={wombat}>
            <Wombat name={wombat} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Wombats
