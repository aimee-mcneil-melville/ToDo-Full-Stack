import React from 'react'

const Button = (props) => {
  const { style, clickFunction, buttonText } = props

  const btnClass = style || 'default'

  return (
    <>
      <button className={`btn btn--${btnClass}`} onClick={clickFunction}>{buttonText}</button>
    </>
  )
}

export default Button
