import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { routes } from './routes.tsx'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <RouterProvider router={routes} />
  )
})
