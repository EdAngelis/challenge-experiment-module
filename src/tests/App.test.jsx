import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import { AppProvider } from '../context'
import App from '../App'

test('renders the App component', () => {
  render(
    <AppProvider>
      <App />
    </AppProvider>
  )

  expect(screen.getByText('Add Module')).toBeInTheDocument()
})
