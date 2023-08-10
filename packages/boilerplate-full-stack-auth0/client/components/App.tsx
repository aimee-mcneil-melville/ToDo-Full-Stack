import Nav from './Nav.tsx'
import PingRoutes from './PingRoutes.tsx'
import Registration from './Registration.tsx'
import Users from './Users.tsx'
import { Routes, Route } from 'react-router-dom'
import { useAuthCache } from '../auth0-utils.ts'

function App() {
  useAuthCache()

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Nav />} />
        <Route path="/" element={<Users />} />
        <Route path="/" element={<PingRoutes />} />
        <Route path="/profile" element={<Registration />} />
      </Routes>
    </div>
  )
}

export default App
