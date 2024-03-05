import { AppProvider } from '../../../context.jsx'
import {
  render,
  cleanup,
  screen,
  fireEvent,
  waitFor
} from '@testing-library/react'
import { test, describe, afterEach, expect } from 'vitest'
import { Experiment } from '../../../components/index.jsx'
import Home from '../../../pages/home.jsx'
import data from '../../../constant/module-data.js'

describe('Experiment', () => {
  afterEach(cleanup)

  test('renders experiment component', () => {
    render(
      <AppProvider>
        <Experiment experiment={data[0]} />
      </AppProvider>
    )
  })

  // Lock Module to any action
  test('Lock Module to any action', () => {
    render(
      <AppProvider>
        <Experiment experiment={data[0]} />
      </AppProvider>
    )

    const lockButton = screen.getByText('LOCK')

    fireEvent.click(lockButton)

    expect(screen.queryByText('LOCK')).toBeNull()
  })

  // UnLock Module to any action
  test('UnLock Button', () => {
    render(
      <AppProvider>
        <Experiment experiment={data[1]} />
      </AppProvider>
    )
    const unLockButton = screen.getByText(/UNLOCK/)

    fireEvent.click(unLockButton)

    expect(screen.queryByText(/UNLOCK/)).toBeNull()
  })

  // Reset ( Remove all Iterations )
  test('Reset ( Remove all Iterations )', async () => {
    render(
      <AppProvider>
        <Experiment experiment={data[1]} />
      </AppProvider>
    )

    const resetButton = screen.getByText('RESET')
    fireEvent.click(resetButton)

    const iterationsParentAfter = screen.queryAllByTestId('iterations')
    expect(iterationsParentAfter.length).toEqual(0)
  })

  // Add Iteration to the Module
  test('Add Iteration to the Module', async () => {
    render(
      <AppProvider>
        <Experiment experiment={data[2]} />
      </AppProvider>
    )

    const iterationsParentBefore = screen.queryAllByTestId('iterations')
    const addIterationButton = screen.getByText('ADD ITERATION', {
      exact: false
    })

    fireEvent.click(addIterationButton)

    const titleInput = screen.getByPlaceholderText('Adding iteration...')
    fireEvent.change(titleInput, { target: { value: 'Test Title' } })

    const autoGeneratePrompt = screen.getByText('generate', { exact: false })
    fireEvent.click(autoGeneratePrompt)

    await waitFor(() => {
      const doneButton = screen.getByTestId('done')
      fireEvent.click(doneButton)
    })

    const iterationsParentAfter = screen.queryAllByTestId('iterations')

    expect(iterationsParentAfter.length).toEqual(
      iterationsParentBefore.length + 1
    )
  })

  // Add Iteration to the Module ( Validation Check )
  test('Add Iteration to the Module, ( Validation Check )', async () => {
    render(
      <AppProvider>
        <Experiment experiment={data[2]} />
      </AppProvider>
    )

    const addIterationButton = screen.getByText('ADD ITERATION', {
      exact: false
    })

    fireEvent.click(addIterationButton)

    const titleInput = screen.getByPlaceholderText('Adding iteration...')
    fireEvent.change(titleInput, { target: { value: '' } })

    const autoGeneratePrompt = screen.getByText('generate', { exact: false })
    fireEvent.click(autoGeneratePrompt)

    await waitFor(() => {
      const doneButton = screen.getByTestId('done')
      fireEvent.click(doneButton)
    })

    const titleValidation = screen.queryByText('Title is required')
    expect(titleValidation).not.toBeNull()
  })

  // Remove Module
  test('Remove Module', () => {
    render(
      <AppProvider>
        <Home />
      </AppProvider>
    )

    const childrenLengthBefore = screen.getByTestId('parent').children.length
    const removeButton = screen.getAllByTestId('remove')
    fireEvent.click(removeButton[0])

    const childrenLengthAfter = screen.getByTestId('parent').children.length

    expect(childrenLengthAfter).toEqual(childrenLengthBefore - 1)
  })

  // Toggle Module Open
  test('Toggle Module Open', () => {
    render(
      <AppProvider>
        <Experiment experiment={data[0]} />
      </AppProvider>
    )

    let contentWrapper = screen.getByTestId('contentWrapper')
    expect(contentWrapper.getAttribute('class')).not.toContain('open')

    const openElement = screen.getByTestId('toggleOpenElement')
    fireEvent.click(openElement)
    contentWrapper = screen.getByTestId('contentWrapper')

    expect(contentWrapper.getAttribute('class')).toContain('open')
  })
})
