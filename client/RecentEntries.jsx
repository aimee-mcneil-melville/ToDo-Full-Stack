var React = require('react')

var RecentEntry = require('./RecentEntry')

function RecentEntries (props) {
  return (
    <div className='recent-entries'>
      <header>Recent entries</header>
      <ul>
        {props.entries.map((entry, key) => {
          return <RecentEntry key={key} entry={entry} />
        })}
      </ul>
    </div>
  )
}

module.exports = RecentEntries

