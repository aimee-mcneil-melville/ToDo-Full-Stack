import React from 'react'
import { connect } from 'react-redux'

import { hide } from './errorHelper'

function Error ({ error }) {
  // TODO: Talk to Field and Claire => styling/layout of this component?
  return (
    error
      ? <div role='alert'>
        {error}
        <button onClick={hide}>Hide Error</button>
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
