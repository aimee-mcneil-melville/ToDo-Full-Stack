import React from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'

function LoadSubreddit ({ children, dispatch }) {
  return (
    <div>
      <button onClick={() => dispatch(fetchPosts('newzealand'))}>
    Fetch Posts
      </button>
      {children}
    </div>
  )
}

export default connect()(LoadSubreddit)
