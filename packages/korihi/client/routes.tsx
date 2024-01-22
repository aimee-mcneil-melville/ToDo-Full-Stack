import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import PostPage from './pages/PostPage.tsx'
import TimelinePage from './pages/TimelinePage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<TimelinePage />} />
    <Route path="p/:id" element={<PostPage />} />
    <Route path="u/:username" element={<ProfilePage />} />
  </Route>,
)
