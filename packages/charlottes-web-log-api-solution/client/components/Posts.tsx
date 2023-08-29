import { Post } from '../../models/post.ts'
import PostSummary from './PostSummary.tsx'

interface Props {
  posts: Post[]
}

function Posts(props: Props) {
  return (
    <div className="posts">
      <h1 className="content-subhead">Posts</h1>
      {props.posts?.map((post) => {
        return <PostSummary key={post.id} post={post} />
      })}
    </div>
  )
}

export default Posts
