import type * as type from '../data/recent-entries'

interface Props {
  entry: type.RecentEntry
}

export default function RecentEntry({ entry }: Props) {
  const { name, link } = entry
  return (
    <li className="recent-entry">
      <a href={link}>{name}</a>
    </li>
  )
}
