import React from 'react'

import { Route, Routes, Outlet } from 'react-router-dom'
import useFetchPosts from './hooks/useFetchPosts'

import Layout from './Layout'
import Post from './Post'
import Posts from './Posts'
import PostForm from './PostForm'
import CommentForm from './CommentForm'

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
