// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'

import App from './components/App'

window.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('root') as HTMLElement).render(<App />)
})
