import { createStore } from 'redux'

import wombatReducer from './reducer'

const store = createStore(wombatReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
