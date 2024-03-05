import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { test, describe, expect, afterEach } from 'vitest'
import { Iteration, Experiment } from '../../../../components/'
import { AppProvider } from '../../../../context'
import data from '../../../../constant/module-data'

describe('Iteration', () => {
  afterEach(cleanup)

  // Render Iteration
  test('renders the iteration component', () => {
    render(
      <AppProvider>
        <Iteration iteration={data[0].iterations[0]} index={0} />
      </AppProvider>
    )
  })

  // Open Iteration
  test('open iteration', () => {
    render(
      <AppProvider>
        <Iteration iteration={data[0].iterations[0]} index={0} />
      </AppProvider>
    )
    const title = screen.getByText(data[0].iterations[0].title)
    fireEvent.click(title)

    const iterationContainer = screen.getByTestId('iteration-container')
    expect(iterationContainer.getAttribute('class')).toContain('open')
  })

  // Close Iteration
  test('close iteration', () => {
    render(
      <AppProvider>
        <Iteration iteration={data[0].iterations[0]} index={0} />
      </AppProvider>
    )
    const title = screen.getByText(data[0].iterations[0].title)
    fireEvent.click(title)

    const iterationContainer = screen.getByTestId('iteration-container')
    expect(iterationContainer.getAttribute('class')).toContain('open')

    const doneButton = screen.getByText('DONE')
    fireEvent.click(doneButton)

    expect(iterationContainer.getAttribute('class')).not.toContain('open')
  })

  // Toggle Selection
  test('toggle selection', () => {
    render(
      <AppProvider>
        <Iteration iteration={data[0].iterations[0]} index={0} />
      </AppProvider>
    )
    const selection = screen.getByTestId('selection')
    fireEvent.click(selection)

    const selectionIcon = screen.getByTestId('selection-icon')
    expect(selectionIcon.getAttribute('class')).toContain('unchecked')

    fireEvent.click(selection)

    expect(selectionIcon.getAttribute('class')).toContain('checked')
  })

  // Select Prompt Size
  test('select prompt size', () => {
    render(
      <AppProvider>
        <Iteration iteration={data[0].iterations[0]} index={0} />
      </AppProvider>
    )
    const shortButton = screen.getByText('SHORT')
    fireEvent.click(shortButton)

    expect(shortButton.getAttribute('class')).toContain('selected')
  })

  // Remove Iteration
  test('remove iteration', () => {
    render(
      <AppProvider>
        <Experiment experiment={data[0]} />
      </AppProvider>
    )
    const iterationsParentBefore = screen.queryAllByTestId('iterations').length

    const removeIterationButton = screen.getAllByText('REMOVE')
    fireEvent.click(removeIterationButton[0])

    const iterationsParentAfter = screen.queryAllByTestId('iterations').length

    expect(iterationsParentAfter).toEqual(iterationsParentBefore - 1)
  })
})
