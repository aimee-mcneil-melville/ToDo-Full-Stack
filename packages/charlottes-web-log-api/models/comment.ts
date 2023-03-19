export interface Comment {
  id: number
  comment: string
  postId: number
  dateCreated: number
}

export interface NewComment {
  comment: string
  postId: number
}
