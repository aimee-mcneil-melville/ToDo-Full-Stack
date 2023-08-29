import { useAppSelector } from '../hooks.ts'
import Wombat from './Wombat.tsx'
import AddWombat from './AddWombat.tsx'

function Wombats() {
  const wombats = useAppSelector((state) => state.wombats)

  return (
    <section>
      <h1>Wombats</h1>
      <ul>
        {wombats.map((wombat) => (
          <li key={wombat}>
            <Wombat name={wombat} />
          </li>
        ))}
      </ul>
      <AddWombat />
    </section>
  )
}

export default Wombats
