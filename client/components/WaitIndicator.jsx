import React from 'react'
import { connect } from 'react-redux'

function WaitIndicator ({ waiting }) {
  return waiting
    ? <p className= "waitIndicator">loading...</p>
    // ? <div className="loader">Loading...</div>
    : <br/>
}

function mapStateToProps (state) {
  return {
    waiting: state.waiting
  }
}

export default connect(mapStateToProps)(WaitIndicator)
