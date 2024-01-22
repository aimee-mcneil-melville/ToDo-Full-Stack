import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useState,
} from 'react'
import { useCreatePost } from '../hooks/use-posts'
import ErrorMessage from './ErrorMessage'

export default function AuthorPostForm() {
  const createPost = useCreatePost()
  const [formState, setFormState] = useState({ text: '' })

  const submit = useCallback(() => {
    if (createPost.isPending) {
      return
    }

    const { text } = formState
    setFormState({ text: '' })

    if (text && typeof text === 'string') {
      createPost.mutate({ text })
    }
  }, [createPost, formState])

  const handleKeyDown = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === 'Enter' && evt.ctrlKey) {
        submit()
      }
    },
    [submit],
  )

  const handleSubmit = useCallback(
    (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault()
      submit()
    },
    [submit],
  )

  const handleChange = useCallback((evt: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = evt.currentTarget
    setFormState((prev) => ({ ...prev, [name]: value }))
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Compose post"
      data-submitting={createPost.isPending}
    >
      {createPost.isError && <ErrorMessage error={createPost.error} />}
      <div>
        <textarea
          aria-label="Post text"
          name="text"
          maxLength={130}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={formState.text}
          className="compose-form__text-input"
          placeholder="What's up with you?"
        />
      </div>
      <div>
        <small className="compose-form__hint">ctrl + enter to submit</small>
      </div>
      <button data-submitting={createPost.isPending}>Send</button>
    </form>
  )
}
