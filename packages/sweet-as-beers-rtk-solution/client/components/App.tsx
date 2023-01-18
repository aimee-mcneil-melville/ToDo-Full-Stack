import { useSelector } from 'react-redux'

import Header from './Header'
import BeerList from './BeerList'
import { RootState } from '../store'
import Cart from './Cart'

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
