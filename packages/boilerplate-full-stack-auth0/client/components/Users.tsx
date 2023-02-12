import { useEffect } from 'react'
import { fetchUsers } from '../actions/user'
import { useAppDispatch, useAppSelector } from '../hooks'

function Users() {
  const dispatch = useAppDispatch()
  const users = useAppSelector((state) => state.users)
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <section className="users">
      <p className="title">Registered users in the database</p>
      <table>
        <thead>
          <tr>
            <th>auth0Id</th>
            <th>name</th>
            <th>email</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.auth0Id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Users
