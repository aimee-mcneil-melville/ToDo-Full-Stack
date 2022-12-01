import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk'

import reducers from './reducers'
import App from './components/App'


const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk))
);

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})
