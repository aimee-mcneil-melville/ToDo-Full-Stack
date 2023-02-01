import { useAppSelector } from '../hooks'

import Post from './Post'

function Subreddit() {
  const subreddits = useAppSelector((state) => state.subreddits)
  return (
    <div>
      {subreddits.map((post, i) => (
        <Post key={i} title={post.title} />
      ))}
    </div>
  )
}

export default Subreddit
