export interface Comment {
  id: number
  comment: string
  postId: number
  dateCreated: number
}

export interface CommentData {
  comment: string
  postId: number
}
