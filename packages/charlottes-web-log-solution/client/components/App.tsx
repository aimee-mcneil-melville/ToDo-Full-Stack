import Header from './Header.tsx'
import headerProps from '../data/header.ts'

import Footer from './Footer.tsx'
import footerProps from '../data/footer.ts'

import Posts from './Posts.tsx'
import OtherBlogs from './OtherBlogs.tsx'
import RecentEntries from './RecentEntries.tsx'

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
