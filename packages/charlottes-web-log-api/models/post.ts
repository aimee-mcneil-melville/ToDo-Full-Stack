export interface Post {
  id: number
  title: string
  text: string
  dateCreated: number
}

export interface NewPost {
  title: string
  text: string
}

export interface UpdatePost {
  title?: string
  text?: string
}
