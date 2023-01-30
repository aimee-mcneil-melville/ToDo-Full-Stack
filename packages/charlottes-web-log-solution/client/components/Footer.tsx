interface Props {
  copyright: number
  author: string
}

export default function Footer({ copyright, author }: Props) {
  return (
    <div className="footer">
      <p>{copyright}</p>
      <p>{author}</p>
    </div>
  )
}
