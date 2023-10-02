import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppSelector } from "../../hooks";
import { useDispatch } from "react-redux";

import css from "../project-one/index.module.scss";
import { ITask, Priority, Status } from "../../types";
import { addTask, deleteTask } from "../../services/actions/actions";
import ModalContainer from "../modal-container";

const ProjectOne = () => {
  const [active, setActive] = useState(false);

  const [modalData, setModalData] = useState('')

  const openModal = (id: string) => {
    setModalData(id);
    setActive(true);
  };

  // const addNewTask = () => {
  //   setActive(true);
  // }

  const allTasks = useAppSelector((state) => state.tasksReducer.allTasks);

  const queueTasks = allTasks.filter((task) => task.status === Status.Queue);
  const developmentTasks = allTasks.filter((task) => task.status === Status.Development);
  const doneTasks = allTasks.filter((task) => task.status === Status.Done);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <button onClick={() => openModal}>Add task</button>

        <div className={css.list_wrapper}>
          <ul className={css.list}>
            <h2>Queue</h2>
            {queueTasks.map((task: ITask) => {
              return (
                <li className={css.item} key={task.id}>
                  <button onClick={() => openModal(task.id)}>
                    <div className={css.task_container}>
                      <p>{task.id}</p>
                      <p>{task.summary}</p>
                      <p>{task.priority}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          <ul className={css.list}>
            <h2>Development</h2>
            {developmentTasks.map((task: ITask) => {
              return (
                <li className={css.item} key={task.id}>
                  <button onClick={() => openModal(task.id)}>
                    <div className={css.task_container}>
                      <p>{task.id}</p>
                      <p>{task.summary}</p>
                      <p>{task.priority}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          <ul className={css.list}>
            <h2>Done</h2>
            {doneTasks.map((task: ITask) => {
              return (
                <li className={css.item} key={task.id}>
                  <button onClick={() => openModal(task.id)}>
                    <div className={css.task_container}>
                      <p>{task.id}</p>
                      <p>{task.summary}</p>
                      <p>{task.priority}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </DndProvider>

      <ModalContainer active={active} setActive={setActive} id={modalData}/>
    </>
  );
};

export default ProjectOne;
