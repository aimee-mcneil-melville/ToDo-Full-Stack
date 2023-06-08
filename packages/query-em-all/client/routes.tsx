import { Route, createRoutesFromElements } from 'react-router-dom'

import AppLayout from './components/AppLayout'
import PokemonList from './components/PokemonList'
import PokemonDetail from './components/PokemonDetail'

export const routes = createRoutesFromElements(
  <Route element={<AppLayout />}>
    <Route index element={<PokemonList />} />
    <Route path="pokemon/:name" element={<PokemonDetail />} />
  </Route>
)
