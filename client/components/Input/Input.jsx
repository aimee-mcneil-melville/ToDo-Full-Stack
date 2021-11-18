import React from 'react'

const Input = (props) => {
  const { name, id, label, changeHandler, value, placeholder } = props
  const type = props.type || 'text'
  return (
    <div className='field'>
      <label className='field__label' htmlFor={id}>{label}</label>
      <input
        className='field__input'
        value={value}
        type={type}
        name={name}
        id={id}
        onChange={changeHandler}
        placeholder={placeholder} />
    </div>
  )
}

export default Input
