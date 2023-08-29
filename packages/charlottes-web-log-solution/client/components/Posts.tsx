import postsData from '../data/posts.ts'
import Post from './Post.tsx'

export default function Posts() {
  return (
    <div className="posts">
      {postsData.map((post) => {
        return <Post key={post.id} {...post} />
      })}
    </div>
  )
}
