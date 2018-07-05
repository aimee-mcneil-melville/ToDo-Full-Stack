import React from 'react'

function Footer (props) {
  // TODO (someday, maybe): get data from a real source
  const copyright = 1980
  const author = 'E. B. White'

  return (
    <div className='footer'>
      <div>&copy; {copyright}</div>
      <div>{author}</div>
    </div>
  )
}

export default Footer
