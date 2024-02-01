import { createRoutesFromElements, Route } from 'react-router-dom'

import Layout from './components/Layout.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<ArtworkListPage />} />
    <Route path="/:id" element={<ArtworkDetailPage />} />
  </Route>
)
