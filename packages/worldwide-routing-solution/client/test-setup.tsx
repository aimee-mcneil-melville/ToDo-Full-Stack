import { expect, beforeEach } from 'vitest'
import { render, cleanup } from '@testing-library/react/pure'
import userEvent from '@testing-library/user-event'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom/vitest'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { routes } from './routes'

expect.extend(matchers)
beforeEach(cleanup)

export function renderRoute(location = '/') {
  const router = createMemoryRouter(routes, {
    initialEntries: [location],
  })
  const screen = render(<RouterProvider router={router} />)
  const user = userEvent.setup()
  return { ...screen, user }
}
