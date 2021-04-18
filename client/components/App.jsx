import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchFriends } from '../actions/index.js'

function App (props) {
  useEffect(() => {
    props.dispatch(fetchFriends())
  }, [])

  return (
    <>
      <div className='app'>
        <h1>rcmndr</h1>
        <ul>
          {props.fruits.map(fruit => (
            <li key={fruit}>{fruit}</li>
          ))}
        </ul>
      </div>
    </>
  )
}
const mapStateToProps = (globalState) => {
  return {
    fruits: globalState.fruits
  }
}

export default connect(mapStateToProps)(App)
