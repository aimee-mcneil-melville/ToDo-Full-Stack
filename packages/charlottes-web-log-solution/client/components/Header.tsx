interface Props {
  title: string
  link: string
}

export default function Header({ link, title }: Props) {
  return (
    <div className="header">
      <h1>
        <a href={link}>{title}</a>
      </h1>
    </div>
  )
}
