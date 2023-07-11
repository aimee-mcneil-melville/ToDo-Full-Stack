import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div>
      <h1>App</h1>
      <p>{"Let's test some forms!"}</p>
      <Outlet />
    </div>
  )
}

export default App
