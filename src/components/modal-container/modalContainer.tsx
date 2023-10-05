import { useDispatch } from "react-redux";

import Modal from "../modal/Modal";
import { useAppSelector } from "../../hooks";
import { addTask, deleteTask, editTask } from "../../services/actions/actions";
import { TForm } from "../../types";
import { useCallback, useMemo } from "react";

interface IModalContainer {
  active: boolean;
  setActive: (value: boolean) => void;
  id: string;
  onClose: () => void;
}

const ModalContainer = ({
  active,
  setActive,
  id,
  onClose,
}: IModalContainer) => {
  const dispatch = useDispatch();

  const changeTask = useCallback((task: TForm, id: string) => {
    dispatch(editTask(task, id));
    setActive(false);
  }, [dispatch, setActive]);

  const removeTask = useCallback((id: string) => {
    dispatch(deleteTask(id));
    setActive(false);
  }, [dispatch, setActive]);

  const allTasks = useAppSelector((state) => state.tasksReducer.allTasks);

  const task = useMemo(() => allTasks.find((task) => task.id === id), [id, allTasks]);

  const saveTask = useCallback((task: TForm) => {
    dispatch(addTask(task));
    setActive(false);
  }, [dispatch, setActive]);

  if (!task) {
    return <Modal active={active} saveTask={saveTask} onClose={onClose} />;
  }

  return (
    <Modal
      active={active}
      task={task}
      editTask={changeTask}
      removeTask={removeTask}
      onClose={onClose}
    />
  );
};

export default ModalContainer;
