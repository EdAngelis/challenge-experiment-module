import { useContext } from 'react'
import { AppContext } from '../../../context'
import styles from './iteration.module.css'

export default function Iteration ({ iteration, index }) {
  const { toggleIterationOpen, setSize, removeIteration, toggleSelected } =
    useContext(AppContext)

  return (
    <div
      className={`${styles.container} ${
        iteration && iteration.open && styles.open
      }`}
      data-testid='iteration-container'
    >
      <span className={styles.index}>EM-{index + 1}</span>
      <div className={`${styles.row}`}>
        <div
          className={styles.title}
          onClick={() => {
            toggleIterationOpen(true, iteration.id)
          }}
        >
          {iteration && iteration.title}
        </div>

        {iteration && !iteration.open && (
          <div
            className={styles.selection}
            onClick={() => toggleSelected(iteration.id)}
            data-testid='selection'
          >
            <span>Selection</span>
            <div
              className={`${
                iteration.selected === false ? styles.unchecked : styles.checked
              }`}
              data-testid='selection-icon'
            />
          </div>
        )}
      </div>
      <div className={`${styles.drawer}`}>
        <div className={styles.content}>
          <button
            type='button'
            className={`${
              (iteration && iteration.size) === '1'
                ? styles.selected
                : styles.unselected
            }`}
            onClick={() => setSize('1', iteration.id)}
          >
            SHORT
          </button>
          <button
            type='button'
            className={`${
              (iteration && iteration.size) === '2'
                ? styles.selected
                : styles.unselected
            }`}
            onClick={() => setSize('2', iteration.id)}
          >
            MEDIUM LENGTH
          </button>
          <button
            type='button'
            className={`${
              iteration && iteration.size === '3'
                ? styles.selected
                : styles.unselected
            }`}
            onClick={() => setSize('3', iteration.id)}
          >
            VERY VERY VERY LONG (UP TO 35 CHAR)
          </button>
        </div>
        <div className={styles.actions}>
          <button
            type='button'
            onClick={() => removeIteration(iteration.id)}
            dada-testid='remove-iteration'
          >
            REMOVE
          </button>
          <button
            type='button'
            onClick={() => {
              toggleIterationOpen(false, iteration.id)
            }}
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  )
}
