import { Link } from 'react-router-dom'

export default function PokemonList() {
  const pokemon = [
    { id: 1, name: 'Bulbasaur' },
    { id: 2, name: 'Ivysaur' },
    { id: 3, name: 'Venusaur' },
  ]

  return (
    <ul>
      {pokemon.map((p) => (
        <li key={p.id}>
          <Link to={`pokemon/${p.name}`}>{p.name}</Link>
        </li>
      ))}
    </ul>
  )
}
