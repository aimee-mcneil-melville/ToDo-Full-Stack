import { Link } from 'react-router-dom'
import { Post } from '../../models/Post.ts'
import { TimeStamp } from './RelativeTimestamp.tsx'
import { API_HOST } from '../env.ts'

interface Props extends Post {}

export default function MaxiPostView({
  author,
  text,
  created_at,
  id,
  ...post
}: Props) {
  return (
    <div className="maxi-post__wrapper">
      {post.parent && (
        <div className="maxi-post__prelude">
          <Link to={`/p/${post.parent.id}`} className="maxi-post__reply_link">
            In reply to {post.parent.author.user_name}
          </Link>
        </div>
      )}
      <img
        className="maxi-post__pfp"
        src={`${API_HOST}/api/v1/users/${author.user_name}/avatar`}
        alt={`portrait of ${author.user_name}`}
      />
      <div className="maxi-post__body">
        <Link
          to={`/u/${author.user_name}`}
          rel="author"
          className="maxi-post__display_name"
        >
          {author.display_name || author.user_name}
        </Link>{' '}
        <Link to={`/p/${id}`} rel="self" className="maxi-post__timestamp">
          <TimeStamp now={new Date()} value={new Date(created_at)} />
        </Link>
        <div className="maxi-post__text">
          {text.split('\n\n').map((str, idx) => (
            <p key={`${idx}-th`}>{str}</p>
          ))}
        </div>
        {post.reply_count > 0 ? (
          <Link to={`/p/${id}`} rel="self" className="maxi-post__reply-count">
            {post.reply_count} replies
          </Link>
        ) : null}
      </div>
    </div>
  )
}
