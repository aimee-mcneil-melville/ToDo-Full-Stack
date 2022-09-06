import React from 'react'
// TODO: import useAuth0 function

const isAuthenticated = () => {
  // TODO: call the useAuth0 hook, destructure and return isAuthenticated
  return true
}

export function IfAuthenticated({ children }) {
  return isAuthenticated() ? <>{children}</> : null
}

export function IfNotAuthenticated({ children }) {
  return !isAuthenticated() ? <>{children}</> : null
}
