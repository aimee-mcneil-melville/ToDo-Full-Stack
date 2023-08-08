import { useAppSelector } from '../hooks.ts'

import Post from './Post.tsx'

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
