 interface Credentials {
  username: string
  password: string
}

 interface RegisterUser {
  username: string
  password: string
  email_address: string
}

 interface UserData {
  username: string
  password?: string
  email_address: string
  contact_details: string
  hash?: string
}
interface Url {
  baseUrl: string
}

interface Jwt {
  email_address: string
  exp:number
  iat:number
  id:number
  username:string
}
declare module 'authenticare/client' {
  export type JwtResponse = Jwt
  export type Cred = Credentials
  export type Register = RegisterUser
  export type User = UserData

  export const isAuthenticated: () => boolean
  export const getDecodedToken: () => Jwt
  export const logOff: () => void
  export const register: (user: Register, url: Url) => Promise<any>
  export const signIn: (user: Credentials, url: Url) => Promise<any>
}

declare module 'authenticare/server' {
  import { Router } from 'express'
  export type JwtResponse = Jwt
  export type User = UserData
  export const generateHash: (password: string) => Promise<string>

  export function applyAuthRoutes(
    router: Router,
    config: {
      userExists(id: string): Promise<boolean>
      getUserByName(name: string): Promise<UserData> | undefined
      createUser(user: UserData): Promise<number[]> | undefined
    }
  ): void
}
