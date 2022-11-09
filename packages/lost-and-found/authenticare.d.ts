declare module 'authenticare/client' {
  export const isAuthenticated: () => boolean
  export const getDecodedToken: () => string
  export const logOff: () => void
}

declare module 'authenticare/server' {
  import { Router } from 'express'
  interface User {
    username: string
    password?: string
    email_address: string
    contact_details: string
    hash?: string
  }
  export function applyAuthRoutes(
    router: Router,
    config: {
      userExists(id: string): Promise<boolean>
      getUserByName(name: string): Promise<User> | undefined
      createUser(user: User ): Promise<number[]> | undefined
    }
  ): void
  export function generateHash(password: string): Promise<string>
}

