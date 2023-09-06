// @vitest-environment jsdom
import { test, expect } from 'vitest'
import { renderRoute } from '../../test-setup'

test('Clicking on the africa link takes me to the africa page', async () => {
  const { user, ...screen } = renderRoute('/')
  const link = screen.getByText('Africa')
  await user.click(link)
  expect(screen.getByRole('heading', { name: 'Africa' })).toBeVisible()
})
