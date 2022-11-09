declare module 'authenticare/client' {
  export const isAuthenticated: () => boolean
  export const getDecodedToken: () => string
  export const logOff: () => void
}

declare module 'authenticare/server' {
  import { Router } from 'express'
  export function applyAuthRoutes(
    router: Router,
    config: {
      userExists(id: string): Promise<boolean>
      getUserByName(name: string): Promise<any>
      createUser(name: string): Promise<any>
    }
  ): void
  export function generateHash(password: string): Promise<string>
}

