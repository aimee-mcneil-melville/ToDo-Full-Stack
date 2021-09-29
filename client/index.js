import React from 'react'
import ReactDOM from 'react-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Auth0Provider
      domain={'gardenz.au.auth0.com'}
      clientId={'UPX21QATLKQlu9iMNfWmZd24Y3Xk2ezF'}
      redirectUri={window.location.origin}
      audience={'https://fullstackboilerplate/api'}
    >
      <App />
    </Auth0Provider>,
    document.getElementById('app')
  )
})
