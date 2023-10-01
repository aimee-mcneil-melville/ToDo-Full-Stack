import RecentEntry from './RecentEntry.jsx'

function RecentEntries({ entriesData }) {
  return (
    <div className="bg-fuchsia-50 ">
      <header>Recent Entries</header>
      <ul>
        {entriesData.map((entry) => (
          <li key={entry.id}>
            <RecentEntry name={entry.name} link={entry.link} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentEntries
