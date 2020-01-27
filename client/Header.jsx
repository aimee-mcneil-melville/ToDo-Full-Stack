import React from 'react'

const Header = props => {
  const { title, link } = props.content
  return (
    <div className='header'>
      <h1><a href={link}>{title}</a></h1>
    </div>
  )
}

export default Header
