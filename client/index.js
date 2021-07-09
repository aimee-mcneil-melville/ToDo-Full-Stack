import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'

import App from './App'
import store from './store'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Auth0Provider
      domain='gardenz.au.auth0.com'
      clientId='sF7Tf4GqnhENJ7l7gArp5c56ZFZ2WOcL'
      redirectUri={window.location.origin}
      audience="https://garden/nz/api"
      scope="read:current_user update:current_user_metadata" // ADD role:admin?
      // From the docs: The actions that your React application can perform on the
      // API depend on the scopes that your access token contains, which you define
      // as the value of scope. Your React application will request authorization
      // from the user to access the requested scopes, and the user will approve or deny the request.
    >
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </Auth0Provider>,
    document.getElementById('app')
  )
})
