import React from 'react'
import { connect } from 'react-redux'

import { hide } from './errorHelper'

function Error ({ error }) {
  // TODO: Talk to Field and Claire => styling/layout of this component?
  return (
    error
      ? <div className="message-error" role='alert'>
        {error}
        <a className="button-cancel" onClick={hide}>&#10005;</a>
      </div>
      : null
  )
}

const mapStateToProps = (state) => {
  return {
    error: state.error
  }
}

export default connect(mapStateToProps)(Error)
