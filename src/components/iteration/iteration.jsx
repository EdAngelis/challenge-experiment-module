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

  const setSize = (size) => {
    const newExperiments = experiments.map((ex) => {
      if (ex.iterations) {
        ex.iterations = ex.iterations.map((it) => {
          if (it.id === iteration.id) {
            it.size = size;
          }
          return it;
        });
      }
      return ex;
    });

    setExperiments(newExperiments);

    console.log("newExperiments", experiments);
  };

  const removeIteration = () => {
    const newExperiments = experiments.map((ex) => {
      ex.iterations = ex.iterations.filter((it) => it.id !== iteration.id);
      return ex;
    });

    setExperiments(newExperiments);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content} onClick={toggleOpen}>
        <span>EM-{index + 1}</span>
        <div className={styles.title}>{iteration.title}</div>
        {!iteration.open && (
          <div className={styles.selection}>
            <span>Selection</span>
            <div
              className={`${
                iteration.size === "0" ? styles.unchecked : styles.checked
              }`}
            ></div>
          </div>
        )}
        {iteration.open && (
          <div className={styles.size}>
            <div className={styles.sizeContent}>
              <button
                className={`${
                  iteration.size === "1" ? styles.selected : styles.unselected
                }`}
                onClick={() => setSize("1")}
              >
                SHORT
              </button>
              <button
                className={`${
                  iteration.size === "2" ? styles.selected : styles.unselected
                }`}
                onClick={() => setSize("2")}
              >
                MEDIUM LENGTH
              </button>
              <button
                className={`${
                  iteration.size === "3" ? styles.selected : styles.unselected
                }`}
                onClick={() => setSize("3")}
              >
                VERY VERY VERY LONG (UP TO 35 CHAR)
              </button>
            </div>
            <div className={styles.sizeButtons}>
              <button onClick={removeIteration}>REMOVE</button>
              <button onClick={toggleOpen}>DONE</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
