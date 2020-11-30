import React from 'react'
import { connect } from 'react-redux'

const WaitIndicator = ({ waiting }) => {
  // TODO: Talk to Field and Claire => how is this component going to look?
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
