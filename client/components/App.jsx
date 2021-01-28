import React, { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import AppRoutes from './AppRoutes'
import { getPosts } from '../api'

function App () {
  const [posts, setPosts] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  function fetchPosts () {
    return getPosts()
      .then(posts => {
        setPosts(posts)
        return null
      })
      .catch(err => {
        setErrorMessage(err.message)
      })
  }

  return (
    <div id='layout' className='pure-g'>
      <div className='sidebar pure-u-1 pure-u-md-1-4'>
        <Header />
      </div>
      <div className='content pure-u-1 pure-u-md-3-4'>
        <AppRoutes
          posts={posts}
          fetchPosts={fetchPosts}
        />
        {errorMessage &&
          <h1>{errorMessage}</h1>
        }
      </div>
      <div className='content pure-u-1 pure-u-md-3-4'>
        <Footer />
      </div>
    </div>
  )
}

export default App
