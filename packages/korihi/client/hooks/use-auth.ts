import { useSyncExternalStore } from 'react'

/**
 * In this example, we save the username and password in sessionStorage
 * and send it with each API request using Basic Auth.
 *
 * This is not a great example, in practice we might use a Cookie from the
 * API server, or a short lived token issued on login
 */
interface Credentials {
  username: string
  password: string
}

interface ErrorMessage {
  error: string
  username: undefined
  password: undefined
}

const STORAGE_KEY = 'korihi-credentials'

type Subscriber = () => void
const subscribers = [] as Array<Subscriber>

function subscribe(r: Subscriber) {
  subscribers.push(r)
  return () => {
    const idx = subscribers.indexOf(r)
    if (idx !== -1) {
      subscribers.splice(idx, 1)
    }
  }
}

function login(creds: Credentials) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(creds))
  publish()
}

function publish() {
  for (const sub of subscribers) {
    try {
      sub()
    } catch (e) {
      console.error(e)
    }
  }
}

function logout() {
  localStorage.removeItem(STORAGE_KEY)
  publish()
}

function authFailed(message: string) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ error: message }))
  publish()
}

function getSnapshot(): string | undefined {
  return localStorage.getItem(STORAGE_KEY) || undefined
}

interface HookData {
  login: typeof login
  logout: typeof logout
  authFailed: typeof authFailed

  username?: string
  password?: string
  error?: ErrorMessage

  isLoggedIn: boolean
  isError: boolean
}

export default function useCredentials() {
  // our getSnapshot returns a string so that react can use it as a cacheKey
  const json = useSyncExternalStore(subscribe, getSnapshot)
  let credentials: Credentials | ErrorMessage | undefined
  try {
    if (json != undefined) {
      credentials = JSON.parse(json)
    }
  } catch (e) {
    /* pass */
  }

  return {
    ...credentials,
    isError: credentials != undefined && 'error' in credentials,
    isLoggedIn: !!credentials,
    login,
    logout,
    authFailed,
  } as HookData
}
