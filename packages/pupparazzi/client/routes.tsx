import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import PuppiesList from './pages/PuppiesList.tsx'
import CreatePuppy from './pages/CreatePuppy.tsx'
import ViewPuppy from './pages/ViewPuppy.tsx'
import EditPuppy from './pages/EditPuppy.tsx'

export default createRoutesFromElements(
  <Route element={<Layout />}>
    <Route index element={<PuppiesList />} />
    <Route path="/new" element={<CreatePuppy />} />
    <Route path="/:id/edit" element={<EditPuppy />} />
    <Route path="/:id" element={<ViewPuppy />} />
  </Route>
)
