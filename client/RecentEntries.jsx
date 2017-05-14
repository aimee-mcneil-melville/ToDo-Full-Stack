var React = require('react')

var RecentEntry = require('./RecentEntry')

function RecentEntries (props) {
  return (
    <div className='recent-entries'>
      <ul>
        {props.entries.map(entry => {
          return <RecentEntry entry={entry} />
        })}
      </ul>
    </div>
  )
}

module.exports = RecentEntries

