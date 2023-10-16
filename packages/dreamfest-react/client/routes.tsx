import { createRoutesFromElements, Route } from 'react-router-dom'

import EditLocation from './components/EditLocation.tsx'
import EditEvent from './components/EditEvent.tsx'
import DaySchedule from './components/DaySchedule.tsx'
import NewEvent from './components/NewEvent.tsx'
import LocationsList from './components/LocationsList.tsx'
import Layout from './components/Layout.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<LocationsList />} />
    <Route path="/schedule/:day" element={<DaySchedule />} />
    <Route path="/locations" element={<LocationsList />} />
    <Route path="/locations/:id/edit" element={<EditLocation />} />
    <Route path="/events/:id/edit" element={<EditEvent />} />
    <Route path="/events/add/:day" element={<NewEvent />} />
  </Route>
)
