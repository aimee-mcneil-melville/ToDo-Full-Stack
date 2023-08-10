import { beforeEach, expect } from 'vitest'
import { cleanup, render } from '@testing-library/react'

import matchers from '@testing-library/jest-dom/matchers.js'
import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers.js'
import _userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import { routes } from './routes.tsx'

beforeEach(cleanup)
expect.extend(matchers)

// the typedefs for this library are a bit out of date
// so this is a workaround
const userEvent = _userEvent as any as typeof _userEvent.default

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
