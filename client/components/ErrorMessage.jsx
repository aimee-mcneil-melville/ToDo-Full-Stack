import React from 'react'
import { connect } from 'react-redux'

export const ErrorMessage = (props) => {
  return (
    <div role='alert' className='error'>
      {props.errorMessage}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.errorMessage
  }
}

export default connect(mapStateToProps)(ErrorMessage)
