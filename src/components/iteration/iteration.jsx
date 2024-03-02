import { useContext } from 'react'
import { AppContext } from '../../context'
import styles from './iteration.module.css'

export default function Iteration ({ iteration, index }) {
  const {
    experiments,
    setExperiments,
    toggleIterationOpen,
    setSize,
    removeIteration,
    toggleSelected
  } = useContext(AppContext)

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span>EM-{index + 1}</span>
        <div
          className={styles.title}
          onClick={() => {
            toggleIterationOpen(true, iteration.id)
          }}
        >
          {iteration.title}
        </div>
        {!iteration.open && (
          <div
            className={styles.selection}
            onClick={() => toggleSelected(iteration.id)}
          >
            <span>Selection</span>
            <div
              className={`${
                iteration.selected === false ? styles.unchecked : styles.checked
              }`}
            />
          </div>
        )}
        {iteration.open && (
          <div className={styles.size}>
            <div className={styles.sizeContent}>
              <button
                className={`${
                  iteration.size === '1' ? styles.selected : styles.unselected
                }`}
                onClick={() => setSize('1', iteration.id)}
              >
                SHORT
              </button>
              <button
                className={`${
                  iteration.size === '2' ? styles.selected : styles.unselected
                }`}
                onClick={() => setSize('2', iteration.id)}
              >
                MEDIUM LENGTH
              </button>
              <button
                className={`${
                  iteration.size === '3' ? styles.selected : styles.unselected
                }`}
                onClick={() => setSize('3', iteration.id)}
              >
                VERY VERY VERY LONG (UP TO 35 CHAR)
              </button>
            </div>
            <div className={styles.sizeButtons}>
              <button onClick={() => removeIteration(iteration.id)}>
                REMOVE
              </button>
              <button
                onClick={() => {
                  toggleIterationOpen(false, iteration.id)
                }}
              >
                DONE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
