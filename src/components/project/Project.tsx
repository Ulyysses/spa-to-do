import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector } from "../../hooks";
import css from "./index.module.scss";
import { ITask, Status } from "../../types";
import ModalContainer from "../modal-container";
import Card from "../card/Card";
import Drop from "../drop";

const Project = () => {
  const [active, setActive] = useState(false);
  const [currentModalId, setCurrentModalId] = useState("");
  const [searchId, setSearchId] = useState("");

  const { project } = useParams();

  const allTasks = useAppSelector((state) => state.tasksReducer.allTasks);
  const allProjectTasks = allTasks.filter((task) => project && task.project === project);
  const filteredFoundTasks = allProjectTasks.filter((task) => task.id.includes(searchId));

  const queueTasks = useMemo(
    () => filteredFoundTasks.filter((task) => task.status === Status.Queue),
    [filteredFoundTasks]
  );
  const developmentTasks = useMemo(
    () => filteredFoundTasks.filter((task) => task.status === Status.Development),
    [filteredFoundTasks]
  );
  const doneTasks = useMemo(
    () => filteredFoundTasks.filter((task) => task.status === Status.Done),
    [filteredFoundTasks]
  );

  const handleInputSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchId(event.target.value);
  };
  
  const onClose = useCallback(() => {
    setCurrentModalId("");
    setActive(false);
  }, []);

  const openModal = useCallback((id: string) => {
    setCurrentModalId(id);
    setActive(true);
  }, []);

  const addNewTask = () => {
    setActive(true);
  };

  return (
    <>
      <button onClick={addNewTask} className={css.add_button}>
        Add task
      </button>

      <input
        type="text"
        placeholder="Enter id"
        value={searchId}
        onChange={handleInputSearchChange}
        className={css.find_input}
      />

      <div className={css.list_wrapper}>
        <Drop status={Status.Queue}>
          <h2 className={css.list_title}>Queue</h2>
          <ul className={css.list}>
            {queueTasks.map((task: ITask) => {
              return (
                <li className={css.item} key={task.id}>
                  <button
                    onClick={() => openModal(task.id)}
                    className={css.card}
                  >
                    <Card
                      id={task.id}
                      priority={task.priority}
                      summary={task.summary}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </Drop>

        <Drop status={Status.Development}>
          <h2 className={css.list_title}>Development</h2>
          <ul className={css.list}>
            {developmentTasks.map((task: ITask) => {
              return (
                <li className={css.item} key={task.id}>
                  <button
                    onClick={() => openModal(task.id)}
                    className={css.card}
                  >
                    <Card
                      id={task.id}
                      priority={task.priority}
                      summary={task.summary}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </Drop>

        <Drop status={Status.Done}>
          <h2 className={css.list_title}>Done</h2>
          <ul className={css.list}>
            {doneTasks.map((task: ITask) => {
              return (
                <li className={css.item} key={task.id}>
                  <button
                    onClick={() => openModal(task.id)}
                    className={css.card}
                  >
                    <Card
                      id={task.id}
                      priority={task.priority}
                      summary={task.summary}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </Drop>
      </div>

      <ModalContainer
        active={active}
        setActive={setActive}
        id={currentModalId}
        onClose={onClose}
        allProjectTasks={allProjectTasks}
      />
    </>
  );
};

export default Project;
