import { useContext, useState } from "react";
import { AppContext } from "../../context.jsx";
import { Iteration } from "../index.jsx";
import styles from "./experiment.module.css";

export default function Experiment({ experiment }) {
  const { experiments, setExperiments } = useContext(AppContext);
  const [newIteration, setNewIteration] = useState("");
  const [addIterationBoolean, setAddIteration] = useState(false);

  const toggleExperimentModule = () => {
    const newExperiments = experiments.map((ex) => {
      if (ex.id === experiment.id) {
        ex.open = !ex.open;
      }
      return ex;
    });
    setExperiments(newExperiments);
  };

  const blockUnblockExperiment = () => {
    const newExperiments = experiments.map((ex) => {
      if (ex.id === experiment.id) {
        ex.blocked = !ex.blocked;
      }
      return ex;
    });
    setExperiments(newExperiments);
  };

  const resetExperiment = () => {
    const newExperiments = experiments.map((ex) => {
      if (ex.id === experiment.id) {
        ex.iterations = [];
      }
      return ex;
    });
    setExperiments(newExperiments);
  };

  const addIteration = () => {
    const newExperiments = experiments.map((ex) => {
      if (ex.id_ === experiment.id_) {
        ex.iterations.push({ title: newIteration, selected: true });
      }
      return ex;
    });
    setExperiments(newExperiments);
    setNewIteration("");
    setAddIteration(false);
  };
  return (
    <div className={styles.container}>
      <div onClick={toggleExperimentModule} className={styles.top}>
        <span>Experiment Module</span>
        <span>{experiment.blocked ? "Blocked" : "Unblocked"}</span>
      </div>
      {experiment.open && (
        <>
          <div>
            {experiment.iterations.map((iteration, index) => {
              return (
                <div key={index}>
                  <Iteration iteration={iteration} index={index} />
                </div>
              );
            })}
            {addIterationBoolean && (
              <>
                <span>EM-{experiment.iterations.length + 1}</span>
                <input
                  type="text"
                  value={newIteration}
                  placeholder="Adding iteration..."
                  onChange={(e) => {
                    setNewIteration(e.target.value);
                  }}
                />
              </>
            )}
          </div>
          {!addIterationBoolean ? (
            <div>
              <button onClick={blockUnblockExperiment}>
                {experiment.blocked ? "UNLOCK" : "LOCK"}
              </button>
              <button onClick={resetExperiment}>RESET</button>
              <button
                onClick={() => {
                  setAddIteration(true);
                }}
              >
                + ADD ITERATION
              </button>
            </div>
          ) : (
            <div className={styles.iterationInput}>
              <div className={styles.iterationActions}>
                <input />
                <button
                  onClick={() => {
                    setAddIteration(false);
                  }}
                >
                  CANCEL
                </button>
                <button onClick={addIteration}>DONE</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
