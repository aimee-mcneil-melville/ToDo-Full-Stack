import type { TPost } from '../data/posts'

type Props = {
  post: TPost
}

export default function Post({ post }: Props) {
  const { title, date, commentCount, paragraphs } = post
  return (
    <div className="post">
      <h2>{title}</h2>
      <div className="date">{date}</div>
      {paragraphs.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
      <div className="comment-count">{commentCount} comments</div>
    </div>
  )
}
