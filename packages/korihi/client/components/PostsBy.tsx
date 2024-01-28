import { useSearchParams, Link } from 'react-router-dom'
import { usePostsBy } from '../hooks/use-posts.ts'
import ErrorMessage from './ErrorMessage.tsx'
import LoadingIndicator from './LoadingIndicator.tsx'
import MaxiPostListView from './MaxiPostListView.tsx'
import { API_HOST } from '../env.ts'

interface Props {
  username: string
}

function useBeforeId() {
  const [search, setSearch] = useSearchParams()
  const str = search.get('beforeId')
  const id = str ? Number(str) : undefined
  const setBeforeId = (id: number) => {
    setSearch((p) => {
      p.set('beforeId', String(id))
      return p
    })
  }

  return [id, setBeforeId] as const
}

export default function PostsBy({ username }: Props) {
  const [beforeId] = useBeforeId()

  const posts = usePostsBy(username, beforeId)
  if (posts.isLoading) {
    return <LoadingIndicator />
  }

  if (posts.isError || !posts.data) {
    return <ErrorMessage error={posts.error} />
  }
  const nextUrl = posts.data.next && new URL(posts.data.next, API_HOST).search

  return (
    <>
      <MaxiPostListView posts={posts.data.items} />
      {nextUrl && <Link to={nextUrl}>see older posts</Link>}
    </>
  )
}
