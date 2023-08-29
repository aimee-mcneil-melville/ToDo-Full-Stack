import { Route, Routes, Outlet } from 'react-router-dom'
import useFetchPosts from './hooks/useFetchPosts.ts'

import Layout from './Layout.tsx'
import Post from './Post.tsx'
import Posts from './Posts.tsx'
import PostForm from './PostForm.tsx'
import CommentForm from './CommentForm.tsx'

function App() {
  const { posts, loading, error, fetchPosts } = useFetchPosts()

  return (
    <Routes>
      <Route path="/" element={<Layout errorMessage={error} />}>
        <Route index element={<Posts posts={posts} />} />
        <Route
          path="posts"
          element={<Outlet context={{ posts, loading, error, fetchPosts }} />}
        >
          <Route path=":id" element={<Post />}>
            <Route
              path="comments/new"
              element={<CommentForm variant="new" />}
            />
          </Route>
          <Route path=":id/edit" element={<PostForm variant="edit" />} />
          <Route path="new" element={<PostForm variant="new" />} />
        </Route>
      </Route>

      {error && error}
    </Routes>
  )
}

export default App
