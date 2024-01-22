import { useReplies } from '../hooks/use-posts.ts'
import ErrorMessage from './ErrorMessage.tsx'
import LoadingIndicator from './LoadingIndicator.tsx'
import MiniPostListView from './MiniPostListView.tsx'
interface Props {
  id: number
}

export default function Replies({ id }: Props) {
  const posts = useReplies(id)
  if (posts.isLoading) {
    return <LoadingIndicator />
  }

  if (posts.isError || !posts.data) {
    return <ErrorMessage error={posts.error} />
  }

  return <MiniPostListView posts={posts.data.items} />
}
