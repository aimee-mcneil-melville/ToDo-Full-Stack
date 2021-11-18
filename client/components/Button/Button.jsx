import React from 'react'

const Button = (props) => {
  const { clickFunction } = props
  const style = props.style || 'default'
  const buttonText = props.buttonText || 'No text supplied'

  return (
    <>
      <button className={`btn btn--${style}`} onClick={clickFunction}>{buttonText}</button>
    </>
  )
}

export default Button
