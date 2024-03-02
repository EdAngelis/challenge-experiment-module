import { useContext, useState } from 'react'
import { AppContext } from '../../context.jsx'
import { Iteration } from '../index.jsx'
import { FaLockOpen, FaLock } from 'react-icons/fa'

import styles from './experiment.module.css'

export default function Experiment ({ experiment }) {
  const {
    toggleOpen,
    blockUnblockExperiment,
    resetExperiment,
    addIteration,
    removeModule
  } = useContext(AppContext)
  const [newIteration, setNewIteration] = useState('')
  const [addIterationBoolean, setAddIteration] = useState(false)

  const hAddIteration = async () => {
    await addIteration(experiment.id, newIteration)
    setNewIteration('')
    setAddIteration(false)
  }

  return (
    <div className={styles.container}>
      {/* TOP */}
      <div onClick={() => toggleOpen(experiment)} className={styles.top}>
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
      <div
        className={`${styles.contentWrapper} ${experiment.open && styles.open}`}
      >
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
              <button onClick={() => blockUnblockExperiment(experiment)}>
                {experiment.blocked ? 'UNLOCK' : 'LOCK'}
              </button>
              {experiment.blocked === false && (
                <button
                  onClick={() => {
                    resetExperiment(experiment)
                  }}
                >
                  RESET
                </button>
              )}
              {experiment.blocked === false && (
                <button
                  onClick={() => {
                    setAddIteration(true)
                  }}
                >
                  + ADD ITERATION
                </button>
              )}
              {experiment.blocked === false && (
                <button
                  onClick={() => {
                    removeModule(experiment.id)
                  }}
                >
                  REMOVE
                </button>
              )}
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
                <button onClick={hAddIteration}>DONE</button>
              </div>
            </div>
            )}
      </div>
    </div>
  )
}
