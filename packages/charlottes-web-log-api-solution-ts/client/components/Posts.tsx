import { IPost } from '../IPost'
import PostSummary from './PostSummary'

interface IProps {
  posts: IPost[]
}

function Posts(props: IProps) {
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
