import React, { useContext } from 'react'
import { AppContext } from '../context'
import { Experiment } from '../components'
import { FaPlus } from 'react-icons/fa'

import styles from './home.module.css'

export default function Home () {
  const { experiments, addModule } = useContext(AppContext)
  return (
    <div className={styles.container} data-testid='parent'>
      {experiments &&
        experiments.map((experiment, index) => {
          return <Experiment key={index} experiment={experiment} />
        })}
      <div className={styles.addButton} onClick={addModule}>
        <FaPlus />
        <span>Add Module</span>
      </div>
    </div>
  )
}
