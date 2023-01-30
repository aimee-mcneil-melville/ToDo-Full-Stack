interface Props {
  name: string
  link: string
}

export default function RecentEntry({ name, link }: Props) {
  return (
    <li className="recent-entry">
      <a href={link}>{name}</a>
    </li>
  )
}
