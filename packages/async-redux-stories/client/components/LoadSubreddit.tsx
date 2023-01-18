import { useAppDispatch } from '../hooks'

import { fetchPosts } from '../actions'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

function LoadSubreddit({ children }: Props) {
  const dispatch = useAppDispatch()

  return (
    <div>
      <button onClick={() => dispatch(fetchPosts('newzealand'))}>
        Fetch Posts
      </button>
      {children}
    </div>
  )
}

export default LoadSubreddit
