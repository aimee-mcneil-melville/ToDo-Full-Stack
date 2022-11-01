import React from 'react'
import App from './components/App'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { getWelcome } from './apiClient'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route index element={<div> hello </div>} />
  )
)
const app = document.getElementById('app') as HTMLInputElement
ReactDOM.createRoot(app).render(
    <RouterProvider router={router} />
)
