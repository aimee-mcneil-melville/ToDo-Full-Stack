import header from '../data/header'

export default function Header() {
  return (
    <div className="header">
      <h1>
        <a href={header.link}>{header.title}</a>
      </h1>
    </div>
  )
}
