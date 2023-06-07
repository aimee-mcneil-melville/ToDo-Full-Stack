export default function PokemonList() {
  const generation = {
    name: 'generation-i',
    region: 'Kanto',
    pokemon: [{ id: 1, name: 'Bulbasaur' }],
  }

  return (
    <>
      <h2>Pokémon in {generation.region}:</h2>
      <ul>
        {generation.pokemon.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </>
  )
}
