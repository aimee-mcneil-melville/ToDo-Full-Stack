import { useAppSelector } from '../hooks.ts'

import Header from './Header.tsx'
import BeerList from './BeerList.tsx'
import Cart from './Cart.tsx'

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
