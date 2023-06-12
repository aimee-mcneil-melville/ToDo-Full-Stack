import { useAppDispatch } from '../hooks'

import { fetchPosts } from '../actions/reddit'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

function LoadSubreddit({ children }: Props) {
  const dispatch = useAppDispatch()

  return (
    <div>
      <button onClick={() => dispatch(fetchPosts('programmertil'))}>
        Fetch Posts
      </button>
      {children}
    </div>
  )
}

export default LoadSubreddit
