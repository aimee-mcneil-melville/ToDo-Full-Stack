import { useParams } from 'react-router-dom'

import MaxiPostView from '../components/MaxiPostView.tsx'
import { usePost } from '../hooks/use-posts.ts'
import Replies from '../components/Replies.tsx'
import WriteReplyForm from '../components/WriteReplyForm.tsx'
import LoadingIndicator from '../components/LoadingIndicator.tsx'
import ErrorMessage from '../components/ErrorMessage.tsx'

export default function PostPage() {
  const id = Number(useParams().id)
  const post = usePost(id)

  if (post.isLoading) {
    return <LoadingIndicator />
  }

  if (post.isError || !post.data) {
    return <ErrorMessage error={post.error} />
  }

  return (
    <>
      <MaxiPostView {...post.data} />
      <div className="row">
        <div className="seven columns">
          <Replies id={id} />
        </div>
        <div className="five columns">
          <WriteReplyForm id={id} />
        </div>
      </div>
    </>
  )
}
