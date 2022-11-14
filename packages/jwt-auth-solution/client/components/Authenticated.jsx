import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuth0()
  return isAuthenticated
}

export function IfAuthenticated({ children }) {
  return useIsAuthenticated() ? <>{children}</> : null
}

export function IfNotAuthenticated({ children }) {
  return !useIsAuthenticated() ? <>{children}</> : null
}
