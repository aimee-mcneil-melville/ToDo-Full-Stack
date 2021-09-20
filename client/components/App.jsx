import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import request from 'superagent'
import { fetchFruits } from '../actions/fruits'
import { cacheUser } from '../auth0-utils'
import Nav from './Nav'

function App(props) {
  cacheUser(useAuth0)
  const [message, setMessage] = useState('')

  useEffect(() => {
    props.dispatch(fetchFruits())
  }, [])

  async function handlePublicEndpoint() {
    const res = await request
      .get('/api/v1/public')

    setMessage(res.body.message)
  }

  async function handleProtectedEndpoint() {
    const res = await request
      .get('/api/v1/protected')
      .set('authorization', `Bearer ${props.token}`)

    setMessage(res.body.message)
  }

  return (
    <nav>
      <div className='app'>
        <Nav />
        <h1>Fullstack Boilerplate - with Fruits!</h1>
        <ul>
          {props.fruits.map(fruit => (
            <li key={fruit}>{fruit}</li>
          ))}
        </ul>
        <div>
          <button onClick={handlePublicEndpoint}>Ping Public Endpoint</button>
        </div>
        <div>
          <button onClick={handleProtectedEndpoint}>Ping Protected Endpoint</button>
        </div>
        <div>
          <button onClick={handlePublicEndpoint}>Ping Public Endpoint</button>
        </div>
        <p>{message}</p>
      </div>
    </nav>
  )
}
const mapStateToProps = (globalState) => {
  return {
    fruits: globalState.fruits,
    token: globalState.user.token
  }
}

export default connect(mapStateToProps)(App)
