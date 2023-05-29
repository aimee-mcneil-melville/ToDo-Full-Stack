import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import Continent from './components/Continent'
import Country from './components/Country'
import Home from './components/Home'
import App from './components/App'

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Home will only be displayed in the root route */}
      <Route index element={<Home />} />
      {/* continent is just like a folder that only contains a subfolder*/}
      <Route path="continent/:id" element={<Continent />} />
      <Route path="continent/:id/:code" element={<Country />} />
    </Route>
  )
)
