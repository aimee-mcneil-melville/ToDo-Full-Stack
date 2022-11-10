export interface User {
  username: string
  password: string
  email_address?: string
}

export interface ServerUser {
  username: string
  password?: string
  email_address: string
  contact_details: string
  hash?: string
}