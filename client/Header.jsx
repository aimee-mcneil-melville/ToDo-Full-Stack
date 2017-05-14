const React = require('react')

function Header (props) {
  const {title, link} = props.content
  return (
    <div className='header'>
      <h1><a href={link}>{title}</a></h1>
    </div>
  )
}

module.exports = Header

