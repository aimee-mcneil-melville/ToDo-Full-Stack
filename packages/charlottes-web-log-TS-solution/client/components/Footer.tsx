import type * as type from '../data/footer'

const Footer = ({ copyright, author }: type.Footer) => {
  return (
    <>
      <p>{copyright}</p>
      <p>{author}</p>
    </>
  )
}

export default Footer