import { useAppSelector } from '../hooks'
import Wombat from './Wombat'
import AddWombat from './AddWombat'

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
