import entries from '../data/recent-entries'
import RecentEntry from './RecentEntry'

export default function RecentEntries() {
  return (
    <div className="recent-entries">
      <header>Recent entries</header>
      <ul>
        {entries.map((entry) => {
          return <RecentEntry key={entry.id} entry={entry} />
        })}
      </ul>
    </div>
  )
}
