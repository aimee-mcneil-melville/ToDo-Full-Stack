import { beforeEach, expect } from 'vitest'
import { cleanup, render } from '@testing-library/react/pure'

import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import { routes } from './routes.tsx'

beforeEach(cleanup)
expect.extend(matchers)

export function renderRoute(location = '/') {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  })

  const router = createMemoryRouter(routes, {
    initialEntries: [location],
  })

  const user = userEvent.setup()

  const container = render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )

  return { user, ...container }
}
