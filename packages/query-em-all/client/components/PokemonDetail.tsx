import { useParams } from 'react-router-dom'

export default function PokemonDetail() {
  const { name } = useParams()

  return <div>Pokemon Details for: {name}</div>
}
