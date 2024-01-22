import { Link, useSearchParams } from 'react-router-dom'
import { usePosts } from '../hooks/use-posts.ts'
import ErrorMessage from './ErrorMessage.tsx'
import LoadingIndicator from './LoadingIndicator.tsx'
import PostListView from './MaxiPostListView.tsx'
import { API_HOST } from '../api-host.ts'

export default function AllPosts() {
  const [urlSearchParams] = useSearchParams()
  const beforeIdStr = urlSearchParams.get('beforeId')
  const beforeId = beforeIdStr ? Number(beforeIdStr) : undefined
  const posts = usePosts(beforeId)

  if (posts.isLoading) {
    return <LoadingIndicator />
  }

  if (posts.isError || !posts.data) {
    return <ErrorMessage error={posts.error} />
  }

  const nextUrl = posts.data.next && new URL(posts.data.next, API_HOST).search
  return (
    <>
      <PostListView posts={posts.data.items} />
      {nextUrl && <Link to={nextUrl}>see older posts</Link>}
    </>
  )
}
