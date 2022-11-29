import type * as type from '../data/header'

export default function Header ({ link, title }: type.Header) {
  return (
    <div className='header'>
    <h1>
      <a href={link}>{title}</a>
    </h1>
  </div>
  )
}
