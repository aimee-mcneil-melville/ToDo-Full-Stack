import React, { useState } from 'react'
import { connect } from 'react-redux'
import request from 'superagent'

function PingRoutes (props) {
  const [message, setMessage] = useState('')

  async function handlePublicEndpoint () {
    try {
      const res = await request
        .get('/api/v1/users/public')

      setMessage(res.body.message)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleProtectedEndpoint () {
    try {
      const res = await request
        .get('/api/v1/users/protected')
        .set('authorization', `Bearer ${props.token}`)

      setMessage(res.body.message)
    } catch (error) {
      console.error(error)
    }
  }

  async function handlePrivateEndpoint () {
    try {
      const res = await request
        .get('/api/v1/users/private')
        .set('authorization', `Bearer ${props.token}`)

      setMessage(res.body.message)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className='ping'>
      <section className='buttons' >
        <div>
          Ping 👉
        </div>
        <div>
          <button onClick={handlePublicEndpoint}>Public</button>
        </div>
        <div>
          <button onClick={handleProtectedEndpoint}>Protected</button>
        </div>
        <div>
          <button onClick={handlePrivateEndpoint}>Private (permissioned)</button>
        </div>
      </section>
      <p className='message'>{message}</p>
    </section>
  )
}
const mapStateToProps = (globalState) => {
  return {
    token: globalState.user.token
  }
}

export default connect(mapStateToProps)(PingRoutes)
