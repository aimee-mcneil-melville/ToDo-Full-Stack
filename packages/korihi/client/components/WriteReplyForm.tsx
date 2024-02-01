import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useState,
  useRef,
} from 'react'
import { useReplyTo } from '../hooks/use-posts'
import ErrorMessage from './ErrorMessage'
interface Props {
  id: number
}

export default function WriteReplyForm({ id }: Props) {
  const replyTo = useReplyTo()
  const [formState, setFormState] = useState({ text: '' })
  const form = useRef<HTMLFormElement>(null)

  const submit = useCallback(() => {
    if (replyTo.isPending || !form.current) {
      return
    }

    const data = new FormData(form.current)
    const text = data.get('text')
    setFormState({ text: '' })

    if (text && typeof text === 'string') {
      replyTo.mutate({ text, id })
    }
  }, [replyTo, id])

  const handleSubmit = useCallback(
    (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault()
      submit()
    },
    [submit],
  )

  const handleKeyDown = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === 'Enter' && evt.ctrlKey) {
        submit()
      }
    },
    [submit],
  )

  const handleChange = useCallback((evt: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = evt.currentTarget
    setFormState((prev) => ({ ...prev, [name]: value }))
  }, [])

  return (
    <form
      ref={form}
      onSubmit={handleSubmit}
      data-submitting={replyTo.isPending}
    >
      {replyTo.isError && <ErrorMessage error={replyTo.error} />}
      <div>
        <textarea
          aria-label="Post text"
          name="text"
          maxLength={130}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={formState.text}
          className="reply-form__text-input"
          placeholder="What's up with you?"
        ></textarea>
      </div>
      <div>
        <small className="compose-form__hint">ctrl + enter to submit</small>
      </div>
      <button data-submitting={replyTo.isPending}>Reply</button>
    </form>
  )
}
