import type * as type from '../data/posts'

interface Props {
  post: type.Post
}

export default function Post({ post }: Props) {
  const { title, date, commentCount, paragraphs } = post
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
