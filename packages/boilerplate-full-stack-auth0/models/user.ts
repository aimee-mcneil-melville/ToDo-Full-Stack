export interface UserData {
  auth0Id: string
  name: string
  email: string
  description?: string
  token?: string
  roles?: string
}

export interface User extends UserData {
  id: number
}
