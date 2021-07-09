import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export function IfAuthenticated ({ children }) {
  const { isAuthenticated } = useAuth0()
  return isAuthenticated
    ? <>{children}</>
    : null
}

export function IfNotAuthenticated ({ children }) {
  const { isAuthenticated } = useAuth0()
  return !isAuthenticated
    ? <>{children}</>
    : null
}
