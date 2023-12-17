import { createRoutesFromElements, Route } from 'react-router-dom'

import Layout from './components/Layout.tsx'
import Ticket from './pages/Ticket.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route path="/:id" element={<Ticket />} />
  </Route>
)
