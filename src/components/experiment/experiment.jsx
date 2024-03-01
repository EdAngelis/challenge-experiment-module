import { useContext, useState } from 'react'
import { AppContext } from '../../context.jsx'
import { Iteration } from '../index.jsx'
import styles from './experiment.module.css'

export default function Experiment( { experiment } ) {
  const { experiments ,setExperiments } = useContext(AppContext)
  const [newIteration, setNewIteration] = useState('')

  const AddIteration = () => {
    const newExperiments = experiments.map( ex => {
      if( ex.id_ === experiment.id_){
        ex.iterations.push( { title: newIteration, selected: true})
      }
      return ex
    })
    setExperiments( newExperiments)
    setNewIteration('')
  }	
  return (
    <div className={styles.container}>
      <span>Experiment { experiment.id_}</span>
      <div>
      {experiment.iterations.map((iteration, index) => {
        return (<div key={index}>
        <Iteration iteration={iteration} index={index} />
        </div>
        )
      })}
      <span>EM-{experiment.iterations.length + 1}</span>
      <input type="text" value={newIteration} placeholder="Adding iteration..." onChange={(e)=> {
        setNewIteration(e.target.value)
      }} />
      </div>
      <div>
      <button>LOCK</button>
      <button>RESET</button>
      <button>+ ADD ITERATION</button>
      </div>
      <div className={styles.iterationInput}>
        <div className={styles.iterationActions}>
        <input />
        <button>CANCEL</button>
        <button onClick={AddIteration}>DONE</button>
        </div>
      </div>
    </div>
  )
}
