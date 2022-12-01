import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useParams, useNavigate, useOutletContext } from 'react-router-dom'
import { addPost, updatePost } from '../api'
import type useFetchPosts from './hooks/useFetchPosts'
type IFetchPosts = ReturnType<typeof useFetchPosts>

interface IProps {
  variant?: 'edit' | 'new'
  loading?: boolean
}

interface Post {
  text: string
  title: string
  id?: number
}

function PostForm(props: IProps) {
  const navigate = useNavigate()
  const { id } = useParams()
  const { posts, loading, fetchPosts } = useOutletContext<IFetchPosts>()
  const post = posts.find((post) => post.id === Number(id))
  const [newPost, setNewPost] = useState({ title: '', text: '' })
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (props.variant === 'edit' && !loading && post) {
      setNewPost({ title: post.title, text: post.text })
    }
  }, [post, loading])

  function onSubmit(e: FormEvent<any>) {
    e.preventDefault()
    if (!completePostData(newPost)) return null
    if (props.variant === 'edit') {
      return updatePost(id!, newPost).then(() => {
        fetchPosts()
        navigate(`/posts/${id}`)
      })
    } else if (props.variant === 'new') {
      return addPost(newPost).then((newPost) => {
        fetchPosts()
        navigate(`/posts/${newPost.id}`)
      })
    }
  }

  function completePostData(post: Post) {
    if (post.text && post.title) {
      return true
    } else {
      setErrorMessage('Your blog entry is incomplete')
      return false
    }
  }

  function handleChange(
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setNewPost({ ...newPost, [e.target.name]: e.target.value })
  }

  if (props.loading) return <p>Loading...</p>

  return (
    <form className="pure-form pure-form-aligned" onSubmit={onSubmit}>
      {props.variant === 'edit' ? (
        <h2 className="post-title">Edit Post</h2>
      ) : (
        <h2 className="post-title">Add a New Blog Post</h2>
      )}

      <fieldset>
        <div className="pure-control-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleChange}
          />
        </div>

        <div className="pure-control-group">
          <label htmlFor="text">Blog</label>
          <textarea
            name="text"
            value={newPost.text}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="pure-controls">
          <input className="pure-button" type="submit" />
        </div>
      </fieldset>

      <p>{errorMessage && errorMessage}</p>
    </form>
  )
}

export default PostForm
