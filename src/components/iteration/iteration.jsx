import styles from './iteration.module.css'

export default function Iteration({ iteration, index }) {
  console.log(iteration)
  return (
    <div className={styles.container}
    >
      <span>EM-{index + 1}</span>
      <div className={styles.container}>{iteration.title}</div>
      <div className={styles.buttons}>
        <button >SHORT</button>
        <button >MEDIUM LENGTH</button>
        <button >{`VERY VERY VERY LONG (UP TO 35 CHAR)`}</button>
      </div>
      <div className={styles.actions}>
        <button >REMOVE</button>
        <button >DONE</button>
      </div>
    </div>
  )
}
