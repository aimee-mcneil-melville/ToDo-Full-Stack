import { Routes, Route } from 'react-router-dom'

import Nav from './Nav.tsx'
import Fruits from './Fruits.tsx'

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Fruits />} />
      </Routes>
    </>
  )
}

export default App
