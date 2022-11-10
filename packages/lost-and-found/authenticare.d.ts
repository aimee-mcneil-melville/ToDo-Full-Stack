interface User {
  username: string
  password?: string
  email_address: string
  contact_details: string
  hash?: string
}

declare module 'authenticare/client' {
  export const isAuthenticated: () => boolean
  export const getDecodedToken: () => string
  export const logOff: () => void
  export const register: (user: User) => Promise<string>


}

declare module 'authenticare/server' {
  import { Router } from 'express'
  
  export const generateHash: (password: string) => Promise<string>

  export function applyAuthRoutes(
    router: Router,
    config: {
      userExists(id: string): Promise<boolean>
      getUserByName(name: string): Promise<User> | undefined
      createUser(user: User ): Promise<number[]> | undefined
    }
  ): void
}

