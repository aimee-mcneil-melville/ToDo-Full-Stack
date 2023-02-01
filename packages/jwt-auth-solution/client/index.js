import ReactDOM from 'react-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    /**
     * Auth0Provider is a component that has a hook that provides
     * all authorization operations
     *
     * TODO: replace the empty strings below with your own domain, clientId, and audience
     */
    <Auth0Provider
      domain="dev-academy-sarah.au.auth0.com"
      clientId="56NSPesWvy1BHcycLcoSHvuZX07Vl4ds"
      redirectUri={window.location.origin}
      audience="https://fruits/api"
    >
      <Router>
        <App />
      </Router>
    </Auth0Provider>,
    document.getElementById('app')
  )
})
