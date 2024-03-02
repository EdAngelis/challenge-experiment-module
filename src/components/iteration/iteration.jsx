import { useContext } from "react";
import { AppContext } from "../../context";
import styles from "./iteration.module.css";

export default function Iteration({ iteration, index }) {
  const { experiments, setExperiments } = useContext(AppContext);

  const toggleOpen = (open) => {
    const newExperiments = experiments.map((ex) => {
      ex.iterations = ex.iterations.map((it) => {
        if (it.id === iteration.id) {
          it.open = open;
        }
        return it;
      });
      return ex;
    });

    setExperiments(newExperiments);
  };

  const setSize = (size) => {
    const newExperiments = experiments.map((ex) => {
      ex.iterations = ex.iterations.map((it) => {
        if (it.id === iteration.id) {
          it.size = size;
        }
        return it;
      });
      return ex;
    });
    setExperiments(newExperiments);
  };

  const removeIteration = () => {
    const newExperiments = experiments.map((ex) => {
      ex.iterations = ex.iterations.filter((it) => it.id !== iteration.id);
      return ex;
    });

    setExperiments(newExperiments);
  };

  const toggleSelected = () => {
    const newExperiments = experiments.map((ex) => {
      ex.iterations = ex.iterations.map((it) => {
        if (it.id === iteration.id) {
          it.selected = !it.selected;
        }
        return it;
      });
      return ex;
    });

    setExperiments(newExperiments);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span>EM-{index + 1}</span>
        <div
          className={styles.title}
          onClick={() => {
            toggleOpen(true);
          }}
        >
          {iteration.title}
        </div>
        {!iteration.open && (
          <div className={styles.selection} onClick={toggleSelected}>
            <span>Selection</span>
            <div
              className={`${
                iteration.selected === false ? styles.unchecked : styles.checked
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
              <button
                onClick={() => {
                  toggleOpen(false);
                }}
              >
                DONE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
