import React from 'react'
import { connect } from 'react-redux'

function WaitIndicator ({ waiting }) {
  return <p className="waitIndicator"> { waiting ? 'loading...' : '\u00a0' }</p>
}

function mapStateToProps (state) {
  return {
    waiting: state.waiting
  }
}

export default connect(mapStateToProps)(WaitIndicator)
