import { useContext, useState } from 'react'
import { AppContext } from '../../context.jsx'
import { Iteration } from '../index.jsx'
import { FaLockOpen, FaLock } from 'react-icons/fa'

import styles from './experiment.module.css'

export default function Experiment ({ experiment }) {
  const { experiments, setExperiments } = useContext(AppContext)
  const [newIteration, setNewIteration] = useState('')
  const [addIterationBoolean, setAddIteration] = useState(false)

  const toggleExperimentModule = () => {
    const newExperiments = experiments.map((ex) => {
      if (ex.id === experiment.id) {
        ex.open = !ex.open
      }
      return ex
    })
    setExperiments(newExperiments)
  }

  const blockUnblockExperiment = () => {
    const newExperiments = experiments.map((ex) => {
      if (ex.id === experiment.id) {
        ex.blocked = !ex.blocked
      }
      return ex
    })
    setExperiments(newExperiments)
  }

  const resetExperiment = () => {
    const newExperiments = experiments.map((ex) => {
      if (ex.id === experiment.id) {
        ex.iterations = []
      }
      return ex
    })
    setExperiments(newExperiments)
  }

  const addIteration = () => {
    const newExperiments = experiments.map((ex) => {
      if (ex.id_ === experiment.id_) {
        ex.iterations.push({ title: newIteration, selected: true })
      }
      return ex
    })
    setExperiments(newExperiments)
    setNewIteration('')
    setAddIteration(false)
  }
  return (
    <div className={styles.container}>
      {/* TOP */}
      <div onClick={toggleExperimentModule} className={styles.top}>
        <span
          className={`${
            experiment.blocked === true ? styles.locked : styles.unlocked
          }`}
        >
          Experiment Module
        </span>
        <span className={styles.icons}>
          {experiment.blocked ? <FaLock /> : <FaLockOpen />}
        </span>
      </div>

      {/* CONTENT */}
      {experiment.open && (
        <div>
          {/* ITERATIONS */}
          <div className={styles.iterations}>
            {experiment.iterations.map((iteration, index) => {
              return (
                <div key={index}>
                  <Iteration iteration={iteration} index={index} />
                </div>
              )
            })}

            {/* ADD ITERATION */}
            {addIterationBoolean && (
              <div className={styles.iterationInput}>
                <span>EM-{experiment.iterations.length + 1}</span>
                <input
                  type='text'
                  value={newIteration}
                  placeholder='Adding iteration...'
                  onChange={(e) => {
                    setNewIteration(e.target.value)
                  }}
                />
              </div>
            )}
          </div>

          {/* ACTIONS */}
          {!addIterationBoolean
            ? (
              <div className={styles.actions}>
                <button onClick={blockUnblockExperiment}>
                  {experiment.blocked ? 'UNLOCK' : 'LOCK'}
                </button>
                <button
                  onClick={() => {
                    if (experiment.blocked === false) resetExperiment()
                  }}
                >
                  RESET
                </button>
                <button
                  onClick={() => {
                    if (experiment.blocked === false) setAddIteration(true)
                  }}
                >
                  + ADD ITERATION
                </button>
              </div>
              )
            : (
              <div className={styles.addIteration}>
                <div className={styles.warn}>
                  To add a new iteration, start typing a promp or{' '}
                  <a href=''>generate</a> one.
                </div>
                <div className={styles.actions}>
                  <button
                    onClick={() => {
                      setAddIteration(false)
                    }}
                  >
                    CANCEL
                  </button>
                  <button onClick={addIteration}>DONE</button>
                </div>
              </div>
              )}
        </div>
      )}
    </div>
  )
}
