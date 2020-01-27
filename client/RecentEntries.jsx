import React from 'react'

import RecentEntry from './RecentEntry'

const RecentEntries = props => (
  <div className='recent-entries'>
    <header>Recent entries</header>
    <ul>
      {props.entries.map(entry => {
        return <RecentEntry key={entry.id} entry={entry} />
      })}
    </ul>
  </div>
)

export default RecentEntries
