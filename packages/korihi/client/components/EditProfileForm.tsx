import { FormEvent, useCallback, useRef, useState, ChangeEvent } from 'react'
import { useUpdateUser } from '../hooks/use-updateuser'
import ErrorMessage from './ErrorMessage'
import { User } from '../../models/User'

interface Props extends User {}

export default function EditProfileForm({
  display_name,
  personal_pronouns,
  bio,
}: Props) {
  const updateUser = useUpdateUser()

  const [formState, setFormState] = useState({
    display_name,
    bio,
    personal_pronouns,
  })

  const form = useRef<HTMLFormElement>(null)

  const submit = useCallback(() => {
    if (updateUser.isPending || !form.current) {
      return
    }
    const data = new FormData(form.current)
    updateUser.mutate({
      display_name: data.get('display_name') as string | undefined,
      bio: data.get('bio') as string | undefined,
      personal_pronouns: data.get('personal_pronouns') as string | undefined,
    })
  }, [updateUser])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (updateUser.isPending) {
        return
      }

      const { name, value } = e.currentTarget
      setFormState((prev) => ({ ...prev, [name]: value }))
    },
    [updateUser],
  )

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      submit()
      // toggleEditing()
    },
    [submit],
  )

  return (
    <>
      <div className="profile-form__wrapper">
        <form
          className="profile-form"
          ref={form}
          onSubmit={handleSubmit}
          data-submitting={updateUser.isPending}
        >
          {updateUser.isError && <ErrorMessage error={updateUser.error} />}
          <div>
            <label htmlFor="displayName">Display Name</label>
            <input
              className="profile-form__input"
              type="text"
              name="display_name"
              value={formState.display_name || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="pronouns">Pronouns</label>
            <input
              className="profile-form__input"
              type="text"
              name="personal_pronouns"
              value={formState.personal_pronouns || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="bio"> Bio</label>
            <input
              className="profile-form__input"
              type="text"
              name="bio"
              value={formState.bio || ''}
              onChange={handleChange}
            />
          </div>
          <button
            className="profile-form__button"
            data-submitting={updateUser.isPending}
          >
            Update!
          </button>
        </form>
      </div>
    </>
  )
}
