export interface UserData {
  display_name: string
  bio: string
}

export interface User {
  id: number
  self: string
  posts: string
  user_name: string
  display_name?: string
  personal_pronouns?: string
  bio?: string
}
