import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import { routes } from '../routes'

export function renderRoute(location = '/') {
  const router = createMemoryRouter(routes, {
    initialEntries: [location],
  })

  const container = render(<RouterProvider router={router} />)
  const user = userEvent.setup()

  return { ...container, user }
}
