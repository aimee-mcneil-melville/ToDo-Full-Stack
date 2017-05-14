const React = require('react')

const Header = require('./Header')
const OtherBlogs = require('./OtherBlogs')
const RecentEntries = require('./RecentEntries')
const Posts = require('./Posts')
const Footer = require('./Footer')

const headerData = require('../data/header')
const otherBlogsData = require('../data/other-blogs')
const recentEntriesData = require('../data/recent-entries')
const postsData = require('../data/posts')
const footerData = require('../data/footer')

function App (props) {
  return (
    <div className='app'>
      <Header content={headerData} />
      <div className='body-container'>
        <OtherBlogs blogs={otherBlogsData} />
        <Posts posts={postsData} />
        <RecentEntries entries={recentEntriesData} />
      </div>
      <Footer content={footerData} />
    </div>
  )
}

module.exports = App

