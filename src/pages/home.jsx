import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context'
import styles from './home.module.css'
import { Experiment } from '../components'

export default function Home() {
  let { experiments } = useContext(AppContext)
  return (
    <>
    {
    experiments.map((experiment, index) => {
      return <Experiment key={index} experiment={experiment} />
    })
    }
    </>
    
  )
}
