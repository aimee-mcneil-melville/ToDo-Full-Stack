import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension';
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'

import reducers from './reducers'
import App from './components/App'

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    document.getElementById('app')
  )
})
