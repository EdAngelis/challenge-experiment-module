import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../context.jsx";
import { Iteration } from "../index.jsx";
import { FaLockOpen, FaLock } from "react-icons/fa";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./experiment.module.css";

export default function Experiment({ experiment }) {
  const {
    toggleOpen,
    blockUnblockExperiment,
    resetExperiment,
    addIteration,
    removeModule,
  } = useContext(AppContext);
  const [addIterationBoolean, setAddIteration] = useState(false);
  const [typing, setTyping] = useState(false);

  const { register, handleSubmit, formState, clearErrors, setValue } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        title: yup.string().required("Title is required"),
        prompt: yup.string().required("Prompt is required"),
      })
    ),
  });

  const { errors } = formState;

  const hSubmit = async (data) => {
    const newIteration = {
      id: parseInt(Date.now() * Math.random()).toString(),
      prompt: data.prompt,
      size: "1",
      title: data.title,
      open: false,
      selected: true,
    };
    await addIteration(experiment.id, newIteration);
    setAddIteration(false);
    setTyping(false);
    setValue("title", "");
    setValue("prompt", "");
  };

  const generatePrompt = () => {
    setValue("prompt", "This is a prompt auto-generated.");
    setTyping(true);
  };

  const hCancel = () => {
    setAddIteration(false);
    setTyping(false);
    setValue("title", "");
    setValue("prompt", "");
    clearErrors();
  };

  return (
    <div className={styles.container}>
      {/* TOP */}
      <div
        className={styles.top}
        onClick={() => toggleOpen(experiment)}
        data-testid="toggleOpenElement"
      >
        <span
          className={`${
            experiment.blocked === true ? styles.locked : styles.unlocked
          }`}
        >
          Experiment Module
        </span>
        {experiment.iterations.length > 0 && (
          <div className={styles.icons}>
            {experiment.blocked ? <FaLock /> : <FaLockOpen />}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div
        className={`${styles.contentWrapper} ${experiment.open && styles.open}`}
        data-testid="contentWrapper"
      >
        {/* ITERATIONS */}
        <form onSubmit={handleSubmit(hSubmit)}>
          <div className={styles.iterations}>
            {experiment.iterations &&
              experiment.iterations.map((iteration, index) => {
                return (
                  <div
                    className={`${styles.iterationElements} ${
                      index === 0 && styles.first
                    } ${
                      index === experiment.iterations.length - 1 &&
                      !addIterationBoolean &&
                      styles.last
                    }`}
                    key={index}
                    data-testid="iterations"
                  >
                    <Iteration iteration={iteration} index={index} />
                  </div>
                );
              })}

            {/* ADD ITERATION */}
            {(addIterationBoolean || experiment.iterations.length < 1) && (
              <div className={styles.iterationInput}>
                <span>EM-{experiment.iterations.length + 1}</span>
                <input
                  type="text"
                  {...register("title")}
                  placeholder="Adding iteration..."
                  maxLength={8}
                />
              </div>
            )}
          </div>

          {/* ACTIONS */}
          {!addIterationBoolean && experiment.iterations.length >= 1 ? (
            <div className={styles.actions}>
              <button
                type="button"
                onClick={() => blockUnblockExperiment(experiment)}
              >
                {experiment.blocked ? "UNLOCK" : "LOCK"}
              </button>
              {experiment.blocked === false && (
                <button
                  type="button"
                  onClick={() => {
                    resetExperiment(experiment);
                  }}
                >
                  RESET
                </button>
              )}
              {experiment.blocked === false && (
                <button
                  type="button"
                  onClick={() => {
                    setAddIteration(true);
                  }}
                >
                  + ADD ITERATION
                </button>
              )}
              {experiment.blocked === false && (
                <button
                  type="button"
                  onClick={() => {
                    removeModule(experiment.id);
                  }}
                  data-testid="remove"
                >
                  REMOVE
                </button>
              )}
            </div>
          ) : (
            <div className={styles.addIteration}>
              {!typing ? (
                <div className={styles.warn}>
                  <span onClick={() => setTyping(!typing)}>
                    To add a new iteration, start typing a prompt or{" "}
                  </span>
                  <span className={styles.generate} onClick={generatePrompt}>
                    generate
                  </span>{" "}
                  one.
                </div>
              ) : (
                <textarea
                  rows="3"
                  cols="50"
                  type="text"
                  {...register("prompt")}
                  autoFocus
                />
              )}

              <div className={styles.actions}>
                <button type="button" onClick={hCancel}>
                  CANCEL
                </button>
                <button type="submit" data-testid="done">
                  DONE
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
      {errors.title && (
        <div className={styles.error}>{errors.title.message}</div>
      )}
      {errors.prompt && (
        <div className={styles.error}>{errors.prompt.message}</div>
      )}
    </div>
  );
}
