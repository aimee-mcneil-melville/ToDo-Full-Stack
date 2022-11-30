import posts from '../data/posts'
import Post from './Post'

export default function Posts() {
  return (
    <div className="posts">
      {posts.map((post) => {
        return <Post key={post.id} post={post} />
      })}
    </div>
  )
}
