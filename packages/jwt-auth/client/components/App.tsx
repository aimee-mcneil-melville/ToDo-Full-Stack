import { Routes, Route } from 'react-router-dom'

import Nav from './Nav'
import Fruits from './Fruits'

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
