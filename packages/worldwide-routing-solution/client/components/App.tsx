import { Routes, Route } from 'react-router-dom'

import Main from './Main'
import Home from './Home'
import Continent from './Continent'
import Country from './Country'

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
