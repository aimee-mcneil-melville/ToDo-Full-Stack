import { expect, beforeEach } from 'vitest'
import { cleanup, render } from '@testing-library/react/pure'
import '@testing-library/jest-dom/vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import userEvent from '@testing-library/user-event'

import routes from './routes.tsx'

import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

beforeEach(cleanup)
expect.extend(matchers)

export function renderRoute(route = '/') {
  const router = createMemoryRouter(routes, {
    initialEntries: [route],
  })
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  const user = userEvent.setup()

  const screen = render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )

  return { ...screen, user }
}
