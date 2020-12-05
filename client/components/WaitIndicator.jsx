import React from 'react'
import { connect } from 'react-redux'

const WaitIndicator = ({ waiting }) => {
  return waiting
    ? <p>WAITING</p>
    : null
}

function mapStateToProps (state) {
  return {
    waiting: state.waiting
  }
}

export default connect(mapStateToProps)(WaitIndicator)
