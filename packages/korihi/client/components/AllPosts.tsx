import { usePosts } from '../hooks/use-posts.ts'
import ErrorMessage from './ErrorMessage.tsx'
import LoadingIndicator from './LoadingIndicator.tsx'
import PostListView from './MaxiPostListView.tsx'

export default function AllPosts() {
  const posts = usePosts()

  if (posts.isLoading) {
    return <LoadingIndicator />
  }

  if (posts.isError || !posts.data) {
    return <ErrorMessage error={posts.error} />
  }

  return (
    <>
      <PostListView posts={posts.data.items} />
    </>
  )
}
