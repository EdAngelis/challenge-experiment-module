import { createContext, useState } from 'react'

export const AppContext = createContext()

export function AppProvider ({ children }) {
  const [experiments, setExperiments] = useState([
    {
      id: 1,
      blocked: false,
      open: false,
      iterations: [
        {
          id: 1,
          title: 'Iteration 1',
          size: '',
          selected: true,
          open: false
        }
      ]
    },
    {
      id: 2,
      blocked: true,
      open: false,
      iterations: [
        {
          id: 2,
          title: 'Iteration 1',
          size: '',
          selected: false,
          open: false
        },
        {
          id: 3,
          title: 'Iteration 2',
          size: '',
          selected: true,
          open: false
        }
      ]
    }
  ])

  const toggleOpen = (experiment) => {
    const newExperiments = experiments.map((ex) => {
      if (ex.id === experiment.id) {
        ex.open = !ex.open
      }
      return ex
    })
    setExperiments(newExperiments)
  }

  const blockUnblockExperiment = (experiment) => {
    const newExperiments = experiments.map((ex) => {
      if (ex.id === experiment.id) {
        ex.blocked = !ex.blocked
      }
      return ex
    })
    setExperiments(newExperiments)
  }

  const resetExperiment = (experiment) => {
    const newExperiments = experiments.map((ex) => {
      if (ex.id === experiment.id) {
        ex.iterations = []
      }
      return ex
    })
    setExperiments(newExperiments)
  }

  const addIteration = (experiment, newIteration) => {
    const newExperiments = experiments.map((ex) => {
      if (ex.id_ === experiment.id_) {
        ex.iterations.push({ title: newIteration, selected: true })
      }
      return ex
    })
    setExperiments(newExperiments)
  }

  const toggleIterationOpen = (open, id) => {
    const newExperiments = experiments.map((ex) => {
      ex.iterations = ex.iterations.map((it) => {
        if (it.id === id) {
          it.open = open
        }
        return it
      })
      return ex
    })

    setExperiments(newExperiments)
  }

  const setSize = (size, id) => {
    const newExperiments = experiments.map((ex) => {
      ex.iterations = ex.iterations.map((it) => {
        if (it.id === id) {
          it.size = size
        }
        return it
      })
      return ex
    })
    setExperiments(newExperiments)
  }

  const removeIteration = (id) => {
    const newExperiments = experiments.map((ex) => {
      ex.iterations = ex.iterations.filter((it) => it.id !== id)
      return ex
    })

    setExperiments(newExperiments)
  }

  const toggleSelected = (id) => {
    const newExperiments = experiments.map((ex) => {
      ex.iterations = ex.iterations.map((it) => {
        if (it.id === id) {
          it.selected = !it.selected
        }
        return it
      })
      return ex
    })
    setExperiments(newExperiments)
  }

  return (
    <AppContext.Provider
      value={{
        experiments,
        setExperiments,
        toggleOpen,
        blockUnblockExperiment,
        resetExperiment,
        addIteration,
        toggleIterationOpen,
        setSize,
        removeIteration,
        toggleSelected
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
