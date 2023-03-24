export interface Post {
  id: number
  title: string
  text: string
  dateCreated: number
}

export interface PostData {
  title: string
  text: string
}

export interface PostUpdate {
  title?: string
  text?: string
}
