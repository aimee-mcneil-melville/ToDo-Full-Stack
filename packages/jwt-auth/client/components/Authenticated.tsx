import React from 'react'
// TODO: import useAuth0 function

const useIsAuthenticated = () => {
  // TODO: call the useAuth0 hook, destructure and return isAuthenticated
  return true
}

export function IfAuthenticated({ children }) {
  return useIsAuthenticated() ? <>{children}</> : null
}

export function IfNotAuthenticated({ children }) {
  return !useIsAuthenticated() ? <>{children}</> : null
}
