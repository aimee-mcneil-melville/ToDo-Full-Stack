import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import Fruits from './components/Fruits'
import App from './components/App'
import { getFruits } from './api'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<App/>}>
      <Route
        index path="/"
        element={<Fruits />}
        loader={async () => await getFruits()}
        // errorElement={<ErrorElement/>}
      />
    </Route>
  )
)
const app = document.getElementById('app') as HTMLInputElement
ReactDOM.createRoot(app).render(
  <Auth0Provider
    domain=""
    clientId=""
    redirectUri={window.location.origin}
    audience=""
  >
    <RouterProvider router={router} />
  </Auth0Provider>
)
