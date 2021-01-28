import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Post from './Post'
import Posts from './Posts'
import PostForm from './PostForm'

function AppRoutes (props) {
  return (
    <div>
      <Switch>
        <Route exact path='/' render={(routerProps) => (
          <Posts
            posts={props.posts}
            fetchPosts={props.fetchPosts}
            {...routerProps}
          />
        )} />
        <Route path='/posts/new' render={(routerProps) => (
          <PostForm
            fetchPosts={props.fetchPosts}
            {...routerProps}
          />
        )} />
        <Route path='/posts/edit/:id' render={(routerProps) => (
          <PostForm
            fetchPosts={props.fetchPosts}
            post={props.posts.find(post => (
              post.id === Number(routerProps.match.params.id))
            )}
            {...routerProps}
          />
        )} />
        <Route path='/posts/:id' render={routerProps => (
          <Post
            fetchPosts={props.fetchPosts}
            post={props.posts.find((post) =>
              post.id === Number(routerProps.match.params.id)
            )}
            {...routerProps}
          />
        )} />
        <Route path='/posts/:postId/comments/:commentId' render={(routerProps) => (
          <Post
            fetchPosts={props.fetchPosts}
            post={props.posts.find(post => (
              post.id === Number(routerProps.match.params.id)
            ))}
            {...routerProps}
          />
        )} />
      </Switch>
    </div>
  )
}

export default AppRoutes
