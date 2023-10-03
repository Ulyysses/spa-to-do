import { useState } from "react";
import { useAppSelector } from "../../hooks";

import css from "../project-one/index.module.scss";
import { ITask, Status } from "../../types";
import ModalContainer from "../modal-container";
import Card from "../card/Card";
import Drop from "../drop";

const ProjectOne = () => {
  const [active, setActive] = useState(false);

  const [currentModalId, setCurrentModalId] = useState('');

  const onClose = () => {
    setCurrentModalId('');
    setActive(false)
  }

  const openModal = (id: string) => {
    setCurrentModalId(id);
    setActive(true);
  };

  const addNewTask = () => {
    setActive(true);
  }

  const allTasks = useAppSelector((state) => state.tasksReducer.allTasks);

  const queueTasks = allTasks.filter((task) => task.status === Status.Queue);
  const developmentTasks = allTasks.filter((task) => task.status === Status.Development);
  const doneTasks = allTasks.filter((task) => task.status === Status.Done);

  return (
    <>

      <button onClick={addNewTask}>Add task</button>

      <div className={css.list_wrapper}>

        <Drop status={Status.Queue}>
          <h2>Queue</h2>
          <ul className={css.list}>
            {queueTasks.map((task: ITask) => {
              return (
                <li className={css.item} key={task.id}>
                  <button onClick={() => openModal(task.id)}>
                    <Card id={task.id} priority={task.priority} summary={task.summary} />
                  </button>
                </li>
              );
            })}
          </ul>
        </Drop>

        <Drop status={Status.Development}>
          <ul className={css.list}>
            <h2>Development</h2>
            {developmentTasks.map((task: ITask) => {
              return (
                <li className={css.item} key={task.id}>
                  <button onClick={() => openModal(task.id)}>
                    <Card id={task.id} priority={task.priority} summary={task.summary} />
                  </button>
                </li>
              );
            })}
          </ul>
        </Drop>

        <Drop status={Status.Done}>
          <ul className={css.list}>
            <h2>Done</h2>
            {doneTasks.map((task: ITask) => {
              return (
                <li className={css.item} key={task.id}>
                  <button onClick={() => openModal(task.id)}>
                    <Card id={task.id} priority={task.priority} summary={task.summary} />
                  </button>
                </li>
              );
            })}
          </ul>
        </Drop>

      </div>


      <ModalContainer active={active} setActive={setActive} id={currentModalId} onClose={onClose} />
    </>
  );
};

export default ProjectOne;
