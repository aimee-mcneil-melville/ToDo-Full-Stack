const React = require('react')

function Footer (props) {
  const {copyright, author} = props.content
  return (
    <div className='footer'>
      <div>&copy; {copyright}</div>
      <div>{author}</div>
    </div>
  )
}

module.exports = Footer

