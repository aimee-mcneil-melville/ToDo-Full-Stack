import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions/user'

function Users (props) {
  useEffect(() => {
    props.dispatch(fetchUsers())
  }, [])

  return (
    <section>
      <p className='title'>Registered Users</p>
      <table>
        <thead>
          <tr>
            <th>
              auth0Id
            </th>
            <th>
              name
            </th>
            <th>
              email
            </th>
            <th>
              description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.users.map(user =>
            <tr key={user.id}>
              <td>
                {user.auth0Id}
              </td>
              <td>
                {user.name}
              </td>
              <td>
                {user.email}
              </td>
              <td>
                {user.description}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  )
}

function mapStateToProps (state) {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Users)
