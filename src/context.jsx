import { createContext, useState } from 'react'
import data from './constant/module-data.js'
export const AppContext = createContext()

export function AppProvider ({ children }) {
  const [experiments, setExperiments] = useState(data)

  const addModule = () => {
    const uniqueId = () => parseInt(Date.now() * Math.random()).toString()
    setExperiments([
      ...experiments,
      {
        id: uniqueId,
        blocked: false,
        open: false,
        iterations: []
      }
    ])
  }

  const removeModule = (id) => {
    const newExperiments = experiments.filter((ex) => ex.id !== id)
    setExperiments(newExperiments)
  }

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

  const addIteration = (id, newIteration) => {
    const uniqueId = () => parseInt(Date.now() * Math.random()).toString()
    const newExperiments = experiments.map((ex) => {
      if (ex.id === id) {
        ex.iterations.push({
          id: uniqueId,
          title: newIteration,
          selected: true
        })
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
        toggleSelected,
        addModule,
        removeModule
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
