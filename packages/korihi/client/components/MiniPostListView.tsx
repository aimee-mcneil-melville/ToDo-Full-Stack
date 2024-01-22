import { Post } from '../../models/Post.ts'
import MiniPostView from './MiniPostView.tsx'

interface Props {
  posts: Post[]
}

export default function MiniPostListView({ posts }: Props) {
  return posts.map((post) => <MiniPostView {...post} key={post.id} />)
}
