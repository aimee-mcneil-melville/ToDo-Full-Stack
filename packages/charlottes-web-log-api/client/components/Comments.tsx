import { Link, Route } from 'react-router-dom'
import { IComment } from '../IComment'

import Comment from './Comment'
import CommentForm from './CommentForm'
import { IFetchComments } from './hooks/useFetchComments'

interface IProps {
  fetchComments: IFetchComments
  postId: number
  comments: IComment[]
}

function Comments(props: IProps) {
  const { postId, comments, fetchComments } = props
  return (
    <div>
      <p>
        <Link className="pure-button" to={`/posts/${postId}/comments/new`}>
          Add A New Comment
        </Link>
      </p>
      <Route
        path="/posts/:postId/comments/new"
        render={(props) => (
          <CommentForm fetchComments={fetchComments} {...props} />
        )}
      />
      <div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            fetchComments={fetchComments}
          />
        ))}
      </div>
    </div>
  )
}

Comments.defaultProps = {
  comments: [],
}

export default Comments
