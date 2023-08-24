import express from 'express'
import * as Path from 'node:path'
import { renderToString } from 'react-dom/server'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import OtherBlogs from './components/OtherBlogs.jsx'
import Posts from './components/Posts.jsx'
import RecentEntries from './components/RecentEntries.jsx'
import Layout from './components/Layout.jsx'

import posts from './data/posts.js'
import recentEntries from './data/recent-entries.js'
import otherBlogs from './data/other-blogs.js'
import footer from './data/footer.js'
import header from './data/header.js'

const server = express()
export default server

const __dirname = Path.dirname(new URL(import.meta.url).pathname)

// Server configuration
const publicFolder = Path.join(__dirname, '../public')
server.use(express.static(publicFolder))

server.get('/', (req, res) => {
  res.send(
    renderToString(
      <Layout>
        <Header link={header.title} title={header.title} />
        <main className="flex flex-row gap-4">
          <div className="w-1/4">
            <OtherBlogs otherBlogsData={otherBlogs} />
          </div>
          <div class="w-1/2">
            <Posts postsData={posts} />
          </div>
          <div>
            <RecentEntries entriesData={recentEntries} />
          </div>
        </main>
        <Footer author={footer.author} copyright={footer.copyright} />
      </Layout>
    )
  )
})
