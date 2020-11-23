import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { UserProvider } from './components/UserContext'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import '../server/public/style/main.scss'
import App from './components/App'
// TODO: create reducer
// import reducers from './reducers'
const reducers = () => {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunkMiddleware)
))

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <UserProvider>
          <App />
        </UserProvider>
      </Router>
    </Provider>,
    document.getElementById('app')
  )
})
