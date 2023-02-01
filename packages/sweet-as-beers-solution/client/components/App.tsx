import { useAppSelector } from '../hooks'

import Header from './Header'
import BeerList from './BeerList'
import Cart from './Cart'

function App() {
  const page = useAppSelector((state) => state.page)

  return (
    <div className="app">
      <Header />
      {page === 'home' ? <BeerList /> : <Cart />}
    </div>
  )
}

export default App
