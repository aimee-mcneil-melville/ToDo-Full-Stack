import Header from './Header'
import headerProps from '../data/header'

import Footer from './Footer'
import footerProps from '../data/footer'

import Posts from './Posts'
import OtherBlogs from './OtherBlogs'
import RecentEntries from './RecentEntries'

function App() {
  return (
    <div className="app">
      <Header {...headerProps} />
      <div className="body-container">
        <OtherBlogs />
        <Posts />
        <RecentEntries />
      </div>
      <Footer {...footerProps} />
    </div>
  )
}

export default App
