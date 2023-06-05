import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import App from './components/App'
import TodoList from './components/TodoList'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<TodoList />} />
    <Route path=":status" element={<TodoList />} />
  </Route>
)

export const router = createBrowserRouter(routes)
