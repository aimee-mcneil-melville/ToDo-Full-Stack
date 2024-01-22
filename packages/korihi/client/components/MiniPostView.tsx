import { Link } from 'react-router-dom'
import { Post } from '../../models/Post.ts'
import { TimeStamp } from './RelativeTimestamp.tsx'
import { API_HOST } from '../api-host.ts'

interface Props extends Post {}

export default function MiniPostView({ author, text, created_at, id }: Props) {
  return (
    <div className="mini-post__wrapper">
      <img
        className="mini-post__pfp"
        src={`${API_HOST}/users/${author.user_name}/avatar`}
        alt={`portrait of ${author.user_name}`}
      />
      <div className="mini-post__body">
        <Link
          to={`/u/${author.user_name}`}
          rel="author"
          className="mini-post__display_name"
        >
          {author.display_name || author.user_name}
        </Link>{' '}
        <Link to={`/p/${id}`} rel="self" className="mini-post__timestamp">
          <TimeStamp now={new Date()} value={new Date(created_at)} />
        </Link>
        <div className="mini-post__text">
          {text.split('\n\n').map((str, idx) => (
            <p key={`${idx}-th`}>{str}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
