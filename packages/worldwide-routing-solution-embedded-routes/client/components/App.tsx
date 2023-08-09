import { Routes, Route } from 'react-router-dom'

import Main from './Main.tsx'
import Home from './Home.tsx'
import Continent from './Continent.tsx'
import Country from './Country.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="/continent/:name" element={<Continent />} />
        <Route path="/continent/:name/:code" element={<Country />} />
      </Route>
    </Routes>
  )
}

export default App
