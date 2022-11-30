import { useAppDispatch } from '../hooks'

import { fetchPosts } from '../actions'

function LoadSubreddit({ children }) {
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
