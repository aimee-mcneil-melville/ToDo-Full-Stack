import { createRoot } from 'react-dom/client'

import App from './components/App.tsx'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <App width={window.innerWidth} height={window.innerHeight} />
  )
})
