// inside PokemonList
//    fetch data from /api/v1/pokemon/generation/1
//    on each pokemon link to /pokemon/:id
// inside PokemonDetail
//    fetch data from /api/v1/pokemon/:id
//    render pokemon moves, abilities, sprites, types (add CSS for this?)

import { Route, Routes } from 'react-router-dom'
import PokemonList from './PokemonList'
import PokemonDetail from './PokemonDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PokemonList />} />
      <Route path="/pokemon/:name" element={<PokemonDetail />} />
    </Routes>
  )
}

export default App
