import Header from './Header'
import headerProps from '../data/header'

import Footer from './Footer'
import footerProps from '../data/footer'

import Posts from './Posts'

function App() {
  return (
    <div className="app">
      <Header {...headerProps} />
      <div className="body-container">
        <Posts />
      </div>
      <Footer {...footerProps} />
    </div>
  )
}

export default App
