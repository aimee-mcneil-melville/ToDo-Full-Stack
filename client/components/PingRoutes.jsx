import React, { useState } from 'react'
import { connect } from 'react-redux'
import request from 'superagent'

function PingRoutes (props) {
  const [message, setMessage] = useState('')

  async function handlePublicEndpoint () {
    const res = await request
      .get('/api/v1/public')

    setMessage(res.body.message)
  }

  async function handleProtectedEndpoint () {
    const res = await request
      .get('/api/v1/protected')
      .set('authorization', `Bearer ${props.token}`)

    setMessage(res.body.message)
  }

  async function handlePrivateEndpoint () {
    const res = await request
      .get('/api/v1/private')
      .set('authorization', `Bearer ${props.token}`)

    setMessage(res.body.message)
  }

  return (
    <section >
      <div>
        <button onClick={handlePublicEndpoint}>Ping Public Endpoint</button>
      </div>
      <div>
        <button onClick={handleProtectedEndpoint}>Ping Protected Endpoint</button>
      </div>
      <div>
        <button onClick={handlePrivateEndpoint}>Ping Private Endpoint</button>
      </div>
      <p>{message}</p>
    </section>
  )
}
const mapStateToProps = (globalState) => {
  return {
    token: globalState.user.token
  }
}

export default connect(mapStateToProps)(PingRoutes)
