import { Post } from '../common/Post'
import PostSummary from './PostSummary'

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
