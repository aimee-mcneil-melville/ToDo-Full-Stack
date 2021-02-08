import React from 'react'

import ErrorMessage from './ErrorMessage'
import LoadSubreddit from './LoadSubreddit'
import SubredditList from './SubredditList'
import WaitIndicator from './WaitIndicator'

function App () {
  return (
    <div className='app'>
      <ErrorMessage />
      <LoadSubreddit>
        <WaitIndicator />
      </LoadSubreddit>
      <SubredditList />
    </div>
  )
}

export default App
