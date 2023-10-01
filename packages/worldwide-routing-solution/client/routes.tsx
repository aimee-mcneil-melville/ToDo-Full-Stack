import { createRoutesFromElements, Route } from 'react-router-dom'

import Continent from './components/Continent.tsx'
import Country from './components/Country.tsx'
import Home from './components/Home.tsx'
import App from './components/App.tsx'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    {/* Home will only be displayed in the root route */}
    <Route index element={<Home />} />
    {/* continent is just like a folder that only contains a subfolder*/}
    <Route path="continent/:id" element={<Continent />} />
    <Route path="continent/:id/:code" element={<Country />} />
  </Route>
)
