import Header from './Header'
import OtherBlogs from './OtherBlogs'
import Posts from './Posts'
import RecentEntries from './RecentEntries'
import Footer from './Footer'

function App() {
  return (
    <div className="app">
      <Header />
      <div className="body-container">
        <OtherBlogs />
        <Posts />
        <RecentEntries />
      </div>
      <Footer />
    </div>
  )
}

export default App
