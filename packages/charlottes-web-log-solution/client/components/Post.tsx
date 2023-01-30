interface Props {
  id: number
  title: string
  date: string
  commentCount: number
  paragraphs: string[]
}

export default function Post({ title, date, commentCount, paragraphs }: Props) {
  return (
    <div className="post">
      <h2>{title}</h2>
      <div className="date">{date}</div>
      {paragraphs.map((text, index) => {
        return <p key={index}>{text}</p>
      })}
      <div className="comment-count">{commentCount} comments</div>
    </div>
  )
}
