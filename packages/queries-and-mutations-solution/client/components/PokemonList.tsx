import { useQuery } from '@tanstack/react-query'
import { Pokemon } from '../../models/pokemon'
import { getAllPokemon } from '../apis/pokemon'
import PokemonListItem from './PokemonListItem'

export default function PokemonList() {
  const { data: pokemon } = useQuery<Pokemon[]>(['pokemon'], getAllPokemon)

  if (!pokemon) return <div>Loading...</div>

  return (
    <div>
      <h2>Pokemon List</h2>
      {pokemon.map((p) => (
        <PokemonListItem key={p.id} id={p.id} name={p.name} />
      ))}
    </div>
  )
}
