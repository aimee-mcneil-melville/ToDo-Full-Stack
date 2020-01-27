import React from 'react'

const RecentEntry = props => {
  const { link, name } = props.entry
  return (
    <li className='recent-entry'>
      <a href={link}>{name}</a>
    </li>
  )
}

export default RecentEntry
