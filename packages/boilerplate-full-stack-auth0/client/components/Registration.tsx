import { useEffect, useState, UIEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router'
import { UserData } from '../../models/user.ts'
import { addUser } from '../apis/users.ts'
import { useAppSelector } from '../hooks.ts'

function Registration() {
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    auth0Id: '',
    name: '',
    email: '',
    description: '',
  } as UserData)

  useEffect(() => {
    setForm({
      auth0Id: user.auth0Id,
      name: user.name || '',
      email: user.email || '',
      description: user.description,
    })
  }, [user])

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  async function handleClick(e: UIEvent) {
    e.preventDefault()
    try {
      await addUser(form as UserData)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="form">
      <h2>Register Profile</h2>
      <form className="registration">
        <label htmlFor="auth0Id">auth0Id</label>
        <input
          name="auth0Id"
          value={form.auth0Id}
          onChange={handleChange}
          disabled={true}
        ></input>

        <label htmlFor="name">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          disabled={true}
        ></input>

        <label htmlFor="email">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          disabled={true}
        ></input>

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          cols={3}
        ></textarea>
        <button type="button" onClick={handleClick}>
          Register
        </button>
      </form>
    </section>
  )
}

export default Registration
