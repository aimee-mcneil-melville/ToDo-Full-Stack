interface UserInt {
  username: string
  password?: string
  email_address: string
  contact_details: string
  hash?: string
}


interface Credentials {
  username: string
  password: string
}

 interface RegisterUser {
  username: string
  password: string
  email_address: string
  contact_details: string

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
  export type User = UserInt
  export const isAuthenticated: () => boolean
  export const getDecodedToken: () => string
  export const logOff: () => void
  export const register: (user: UserInt, url: Url) => Promise<any>
  export const signIn: (user: UserInt, url: Url) => Promise<any>
}

declare module 'authenticare/server' {
  import { Router } from 'express'

  export const generateHash: (password: string) => Promise<string>

  export function applyAuthRoutes(
    router: Router,
    config: {
      userExists(id: string): Promise<boolean>
      getUserByName(name: string): Promise<UserInt> | undefined
      createUser(user: UserInt): Promise<number[]> | undefined
    }
  ): void
}
