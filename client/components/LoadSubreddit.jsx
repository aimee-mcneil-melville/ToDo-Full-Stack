import React from 'react'
import { useDispatch } from 'react-redux'

import { fetchPosts } from '../actions'

function LoadSubreddit ({ children }) {
  const dispatch = useDispatch()

  return (
    <div>
      <button onClick={() => dispatch(fetchPosts('newzealand'))}>
    Fetch Posts
      </button>
      {children}
    </div>
  )
}

export default LoadSubreddit
