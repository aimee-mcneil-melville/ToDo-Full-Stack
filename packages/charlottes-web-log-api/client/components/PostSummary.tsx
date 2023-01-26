import { Link } from 'react-router-dom'
import { Post } from '../../common/post'

interface Props {
  post: Post
  children?: React.ReactNode
}

function PostSummary(props: Props) {
  const { title, text, dateCreated, id } = props.post
  const paragraphs = text?.split('\n') || []
  return (
    <div className="post">
      <Link to={`/posts/${id}`}>
        <header className="post-header">
          <h2 className="post-title">{title}</h2>
          <p className="post-meta">
            Date Created: {new Date(dateCreated!).toDateString()}
          </p>
        </header>
      </Link>

      {paragraphs.map((para, key) => {
        return <p key={key}>{para}</p>
      })}
      {props.children}
    </div>
  )
}

export default PostSummary
