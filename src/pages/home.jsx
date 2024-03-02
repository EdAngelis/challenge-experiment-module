import React, { useContext } from 'react'
import { AppContext } from '../context'
import { Experiment } from '../components'
import styles from './home.module.css'

export default function Home () {
  const { experiments } = useContext(AppContext)
  return (
    <div className={styles.container}>
      {experiments.map((experiment, index) => {
        return <Experiment key={index} experiment={experiment} />
      })}
    </div>
  )
}
