import React from 'react'
import { connect } from 'react-redux'

import Post from './Post'

function Subreddit ({ subreddits }) {
  return (
    <div>
      {subreddits.map((post, i) =>
        <Post
          key={i}
          title={post.title}
        />
      )}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    subreddits: state.subreddits
  }
}

export default connect(
  mapStateToProps
)(Subreddit)
