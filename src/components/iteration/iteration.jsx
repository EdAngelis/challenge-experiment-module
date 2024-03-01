import { useContext } from "react";
import { AppContext } from "../../context";
import styles from "./iteration.module.css";

export default function Iteration({ iteration, index }) {
  const { experiments, setExperiments } = useContext(AppContext);

  const toggleOpen = () => {
    const newExperiments = experiments.map((ex) => {
      if (ex.iterations) {
        ex.iterations = ex.iterations.map((it) => {
          if (it.id === iteration.id) {
            it.open = !it.open;
          }
          return it;
        });
      }
      return ex;
    });

    setExperiments(newExperiments);
  };

  const promptSize = (size) => {
    const newExperiments = experiments.map((ex) => {
      if (ex.iterations) {
        ex.iterations = ex.iterations.map((it) => {
          if (it.id === iteration.id) {
            it.promptSize = size;
          }
          return it;
        });
      }
      return ex;
    });

    setExperiments(newExperiments);
    console.log(experiments);
  };

  return (
    <div className={styles.container}>
      <span>EM-{index + 1}</span>
      <div onClick={toggleOpen} className={styles.container}>
        {iteration.title}
      </div>
      {iteration.open && (
        <>
          <div>
            <button onClick={() => promptSize("0")}>SHORT</button>
            <button onClick={() => promptSize("1")}>MEDIUM LENGTH</button>
            <button onClick={() => promptSize("2")}>
              VERY VERY VERY LONG (UP TO 35 CHAR)
            </button>
          </div>
          <div className={styles.actions}>
            <button>REMOVE</button>
            <button>DONE</button>
          </div>
        </>
      )}
    </div>
  );
}
