import Nav from './Nav'
import PingRoutes from './PingRoutes'
import Registration from './Registration'
import Users from './Users'
import { Routes, Route } from 'react-router-dom'
import { useAuthCache } from '../auth0-utils'

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
