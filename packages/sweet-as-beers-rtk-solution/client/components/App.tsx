import { useSelector } from 'react-redux'

import Header from './Header.tsx'
import BeerList from './BeerList.tsx'
import { RootState } from '../store.ts'
import Cart from './Cart.tsx'

function App() {
  const activePage = useSelector<RootState>((state) => state.activePage)
  return (
    <div className="app">
      <Header />
      {activePage === 'cart' ? <Cart /> : <BeerList />}
    </div>
  )
}

export default App
