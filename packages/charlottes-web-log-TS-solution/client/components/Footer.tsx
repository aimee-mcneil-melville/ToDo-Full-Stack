import type * as type from '../data/footer'

export default function Footer ({ copyright, author }: type.Footer) {
  return (
    <div className='footer'>
      <p>{copyright}</p>
      <p>{author}</p>
    </div>
  )
  }