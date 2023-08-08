import ErrorMessage from './ErrorMessage.tsx'
import LoadSubreddit from './LoadSubreddit.tsx'
import SubredditList from './SubredditList.tsx'
import WaitIndicator from './WaitIndicator.tsx'

function App() {
  return (
    <div className="app">
      <ErrorMessage />
      <LoadSubreddit>
        <WaitIndicator />
      </LoadSubreddit>
      <SubredditList />
    </div>
  )
}

export default App
