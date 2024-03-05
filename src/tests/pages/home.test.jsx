import React from 'react'
import { AppProvider } from '../../context'

import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import { test, describe, afterEach, expect } from 'vitest'

import Home from '../../pages/home'

const Wrapper = ({ children }) => {
  return <AppProvider>{children}</AppProvider>
}

describe('Home Component', () => {
  afterEach(cleanup)

  test('renders without crashing', () => {
    render(<Home />, { wrapper: Wrapper })
  })

  test('Add Experiment Module', async () => {
    render(<Home />, { wrapper: Wrapper })

    const childrenLengthBefore = screen.getByTestId('parent').children.length
    const addButton = screen.getByText('Add Module')

    fireEvent.click(addButton)

    const childrenLengthAfter = screen.getByTestId('parent').children.length
    expect(childrenLengthAfter - 1).toEqual(childrenLengthBefore)
  })
})
