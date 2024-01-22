import { Post } from '../../models/Post.ts'
import MaxiPostView from './MaxiPostView.tsx'

interface Props {
  posts: Post[]
}

export default function PostListView({ posts }: Props) {
  return posts.map((post) => <MaxiPostView {...post} key={post.id} />)
}
