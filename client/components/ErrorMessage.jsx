import React from 'react'
import { connect } from 'react-redux'

import { hideError } from '../actions/error'

const ErrorMessage = (props) => {
  const hide = () => {
    props.hideError()
  }

  return (
    props.errorMessage.length
      ? <div role='alert' className='error'>
        {props.errorMessage}
        <button className='hide-error' onClick={hide}>Hide Error</button>
      </div>
      : null
  )
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.errorMessage
  }
}

const mapDispatchToProps = {
  hideError
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage)
