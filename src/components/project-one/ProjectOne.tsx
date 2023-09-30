import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppSelector } from "../../hooks";
import { useDispatch } from "react-redux";

import css from "../project-one/index.module.scss";
import Modal from "../modal";
import { ITask, Priority } from "../../types";
import { addTask } from "../../services/actions/actions";

const ProjectOne = () => {
  const [active, setActive] = useState(false);

  const openModal = () => {
    setActive(true);
  };

  const allTasks = useAppSelector((state) => state.tasksReducer.allTasks);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <button onClick={openModal}>Add task</button>

        <div className={css.list_wrapper}>
          <ul className={css.list}>
            <h2>Queue</h2>
            {allTasks.map((task: ITask) => {
              return (
                <li className={css.item}>
                  <div onClick={openModal} className={css.task_container}>
                    <p>{task.number}</p>
                    <p>{task.summary}</p>
                    <p>{task.priority}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <ul className={css.list}>
            <h2>Development</h2>
            <li className={css.item}>
              <div onClick={openModal} className={css.task_container}>
                <p>64384</p>
                <p>Summary:</p>
                <p>Priority:</p>
              </div>
            </li>
          </ul>

          <ul className={css.list}>
            <h2>Done</h2>
            <li className={css.item}>
              <div onClick={openModal} className={css.task_container}>
                <p>64384</p>
                <p>Summary:</p>
                <p>Priority:</p>
              </div>
            </li>
          </ul>
        </div>
      </DndProvider>

      <Modal active={active} setActive={setActive} />
    </>
  );
};

export default ProjectOne;
