import { ChangeEvent, useState } from "react";

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

  const allTasks = useAppSelector((state) => state.tasksReducer.allTasks);

  const handleInputSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchId(event.target.value);
  };

  const filteredTasks = allTasks.filter((task) => task.id.includes(searchId));

  const onClose = () => {
    setCurrentModalId("");
    setActive(false);
  };

  const openModal = (id: string) => {
    setCurrentModalId(id);
    setActive(true);
  };

  const addNewTask = () => {
    setActive(true);
  };

  const queueTasks = filteredTasks.filter((task) => task.status === Status.Queue);
  const developmentTasks = filteredTasks.filter(
    (task) => task.status === Status.Development
  );
  const doneTasks = filteredTasks.filter((task) => task.status === Status.Done);

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
      />
    </>
  );
};

export default Project;
