import React from 'react'

const Footer = props => {
  const { copyright, author } = props.content
  return (
    <div className='footer'>
      <div>&copy; {copyright}</div>
      <div>{author}</div>
    </div>
  )
}

export default Footer
