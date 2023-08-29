import { beforeEach, expect } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom/vitest'

beforeEach(cleanup)
expect.extend(matchers)
