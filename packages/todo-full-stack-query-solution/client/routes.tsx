import { createRoutesFromElements, Route } from 'react-router-dom'

import App from './components/App.tsx'
import TodoList from './components/TodoList.tsx'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<TodoList />} />
    <Route path=":status" element={<TodoList />} />
  </Route>
)
