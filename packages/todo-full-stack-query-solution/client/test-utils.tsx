import { beforeEach, expect } from 'vitest'
import { cleanup, render } from '@testing-library/react'

import matchers, {
  TestingLibraryMatchers,
} from '@testing-library/jest-dom/matchers'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import { routes } from './routes'

beforeEach(cleanup)
expect.extend(matchers)

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars
    interface Matchers<R = void, T = {}>
      extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
  }
}

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
