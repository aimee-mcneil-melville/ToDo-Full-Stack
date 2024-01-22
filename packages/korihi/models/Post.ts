export interface PostData {
  text: string
}
export interface Post {
  id: number
  self: string
  parent: {
    author: {
      id: number
      self: string
      user_name: string
      display_name?: string
      bio?: string
      posts: string
    }
    id: number
    text: string
    created_at: number
  } | null
  author: {
    self: string
    user_name: string
    display_name?: string
    bio?: string
    posts: string
  }
  created_at: number
  text: string
  replies: string
  reply_count: number
}

export interface PagedPosts {
  items: Post[]
  next?: string
}
