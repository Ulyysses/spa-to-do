import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Modal from "../modal/Modal";
import { addTask, deleteTask, editTask } from "../../services/actions/actions";
import { ITask, TForm } from "../../types";
import { useCallback, useMemo } from "react";

interface IModalContainer {
  active: boolean;
  setActive: (value: boolean) => void;
  id: string;
  onClose: () => void;
  allProjectTasks: ITask[];
}

const ModalContainer = ({
  active,
  setActive,
  id,
  onClose,
  allProjectTasks
}: IModalContainer) => {
  const dispatch = useDispatch();

  const changeTask = useCallback(
    (task: TForm, id: string) => {
      dispatch(editTask(task, id));
      setActive(false);
    },
    [dispatch, setActive]
  );

  const removeTask = useCallback(
    (id: string) => {
      dispatch(deleteTask(id));
      setActive(false);
    },
    [dispatch, setActive]
  );

  const task = useMemo(
    () => allProjectTasks.find((task) => task.id === id),
    [id, allProjectTasks]
  );

  const { project } = useParams();

  const saveTask = useCallback(
    (task: TForm) => {
      project && dispatch(addTask(task, project));
      setActive(false);
    },
    [dispatch, setActive, project]
  );

  if (!task) {
    return <Modal active={active} saveTask={saveTask} onClose={onClose} allProjectTasks={allProjectTasks}/>;
  }

  return (
    <Modal
      active={active}
      task={task}
      editTask={changeTask}
      removeTask={removeTask}
      onClose={onClose}
      allProjectTasks={allProjectTasks}
    />
  );
};

export default ModalContainer;
