import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import reducers from './reducers'
import App from './components/App'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route index element={<App/>}/>
  )
)
const app = document.getElementById('app') as HTMLInputElement
ReactDOM.createRoot(app).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>,
)
