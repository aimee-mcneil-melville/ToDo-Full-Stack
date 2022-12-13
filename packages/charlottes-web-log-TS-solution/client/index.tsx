// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'

import App from './components/App'

// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(<App />, document.getElementById('root'))
// })

const container = document.getElementById('root')
const root = createRoot(container)

root.render(<App />)