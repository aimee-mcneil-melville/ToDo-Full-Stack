import Header from './Header'
import headerProps from '../data/header'

import Footer from './Footer'
import footerProps from '../data/footer'

function App() {
  return (
    <div>
      <Header {...headerProps}/>
      <Footer {...footerProps} />
    </div>
  )
}

export default App
