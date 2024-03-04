import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AppContext } from '../../context.jsx'
import { Iteration } from '../index.jsx'
import { FaLockOpen, FaLock } from 'react-icons/fa'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import styles from './experiment.module.css'

export default function Experiment ({ experiment }) {
  const {
    toggleOpen,
    blockUnblockExperiment,
    resetExperiment,
    addIteration,
    removeModule
  } = useContext(AppContext)
  const [addIterationBoolean, setAddIteration] = useState(false)
  const [typing, setTyping] = useState(false)

  const { register, handleSubmit, formState, clearErrors } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        title: yup.string().required('Title is required'),
        prompt: yup.string().required('Prompt is required')
      })
    )
  })

  const { errors } = formState

  const hSubmit = async (data) => {
    console.log(data)
    const newIteration = {
      id: parseInt(Date.now() * Math.random()).toString(),
      prompt: data.prompt,
      size: '1',
      title: data.title,
      open: false,
      selected: true
    }
    await addIteration(experiment.id, newIteration)
    setAddIteration(false)
    setTyping(false)
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
        {experiment.iterations.length > 0 && (
          <div className={styles.icons}>
            {experiment.blocked ? <FaLock /> : <FaLockOpen />}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div
        className={`${styles.contentWrapper} ${experiment.open && styles.open}`}
      >
        {/* ITERATIONS */}
        <form onSubmit={handleSubmit(hSubmit)}>
          <div className={styles.iterations}>
            {experiment.iterations.map((iteration, index) => {
              return (
                <div className={styles.iterationElements} key={index}>
                  <Iteration iteration={iteration} index={index} />
                </div>
              )
            })}

            {/* ADD ITERATION */}
            {(addIterationBoolean || experiment.iterations.length < 1) && (
              <div className={styles.iterationInput}>
                <span>EM-{experiment.iterations.length + 1}</span>
                <input
                  type='text'
                  {...register('title')}
                  placeholder='Adding iteration...'
                />
              </div>
            )}
          </div>

          {/* ACTIONS */}
          {!addIterationBoolean && experiment.iterations.length >= 1
            ? (
              <div className={styles.actions}>
                <button
                  type='button'
                  onClick={() => blockUnblockExperiment(experiment)}
                >
                  {experiment.blocked ? 'UNLOCK' : 'LOCK'}
                </button>
                {experiment.blocked === false && (
                  <button
                    type='button'
                    onClick={() => {
                      resetExperiment(experiment)
                    }}
                  >
                    RESET
                  </button>
                )}
                {experiment.blocked === false && (
                  <button
                    type='button'
                    onClick={() => {
                      setAddIteration(true)
                    }}
                  >
                    + ADD ITERATION
                  </button>
                )}
                {experiment.blocked === false && (
                  <button
                    type='button'
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
                {!typing
                  ? (
                    <div className={styles.warn}>
                      <span onClick={() => setTyping(!typing)}>
                        To add a new iteration, start typing a prompt or{' '}
                      </span>
                      <span
                        className={styles.generate}
                        onClick={() => {
                          setTyping(false)
                        }}
                      >
                        generate
                      </span>{' '}
                      one.
                    </div>
                    )
                  : (
                    <textarea
                      rows='3'
                      cols='50'
                      type='text'
                      {...register('prompt')}
                      autoFocus
                    />
                    )}

                <div className={styles.actions}>
                  <button
                    type='button'
                    onClick={() => {
                      setAddIteration(false)
                      setTyping(false)
                      clearErrors()
                    }}
                  >
                    CANCEL
                  </button>
                  <button type='submit'>DONE</button>
                </div>
              </div>
              )}
        </form>
      </div>
      {errors.title && (
        <div className={styles.error}>{errors.title.message}</div>
      )}
      {errors.prompt && (
        <div className={styles.error}>{errors.prompt.message}</div>
      )}
    </div>
  )
}
