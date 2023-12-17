import { createRoutesFromElements, Route } from 'react-router-dom'

import Layout from './components/Layout.tsx'
import Home from './components/Home.tsx'
import ArtworkList from './components/ArtworkList.tsx'
import GalleryList from './components/GalleryList.tsx'
import ArtworkDetails from './components/ArtworkDetails.tsx'
import GalleryDetails from './components/GalleryDetails.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="/artworks" element={<ArtworkList />} />
    <Route path="/artworks/:id" element={<ArtworkDetails />} />
    <Route path="/galleries" element={<GalleryList />} />
    <Route path="/galleries/:id" element={<GalleryDetails />} />
  </Route>
)
