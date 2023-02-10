import { ReactNode } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  children: ReactNode
}

export function IfAuthenticated({ children }: Props) {
  const { isAuthenticated } = useAuth0()

  return isAuthenticated ? <>{children}</> : null
}

export function IfNotAuthenticated({ children }: Props) {
  const { isAuthenticated } = useAuth0()

  return !isAuthenticated ? <>{children}</> : null
}
