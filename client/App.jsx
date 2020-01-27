import React from 'react'

import Header from './Header'
import OtherBlogs from './OtherBlogs'
import RecentEntries from './RecentEntries'
import Posts from './Posts'
import Footer from './Footer'

import headerData from '../data/header'
import otherBlogsData from '../data/other-blogs'
import recentEntriesData from '../data/recent-entries'
import postsData from '../data/posts'
import footerData from '../data/footer'

const App = props => (
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

export default App
