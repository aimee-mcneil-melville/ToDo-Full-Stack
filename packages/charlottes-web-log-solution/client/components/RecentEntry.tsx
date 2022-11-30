import type { TRecentEntry } from '../data/recent-entries'

type Props = {
  entry: TRecentEntry
}

export default function RecentEntry({ entry }: Props) {
  const { link, name } = entry
  return (
    <li className="recent-entry">
      <a href={link}>{name}</a>
    </li>
  )
}
