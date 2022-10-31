import React from 'react'

function Footer() {
  const copyright = '1952 Harper & Brothers'
  const author = 'E. B. White'

  return (
    <div className="footer">
      <div>&copy; {copyright}</div>
      <div>{author}</div>
    </div>
  )
}

export default Footer
