import React from 'react'
import { connect } from 'react-redux'

function WaitIndicator ({ waiting }) {
  return waiting
    ? <p>WAITING</p>
    : <br/>
}

function mapStateToProps (state) {
  return {
    waiting: state.waiting
  }
}

export default connect(mapStateToProps)(WaitIndicator)
