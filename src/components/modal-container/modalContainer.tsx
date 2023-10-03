import Modal from "../modal/Modal";
import { useAppSelector } from "../../hooks";
import { useState } from "react";
import { addTask, deleteTask, editTask } from "../../services/actions/actions";
import { ITask, TForm } from "../../types";
import { useDispatch } from "react-redux";

interface IModalContainer {
    active: boolean;
    setActive: (value: boolean) => void;
    id: string;
    onClose: () => void;
}

const ModalContainer = ({ active, setActive, id, onClose }: IModalContainer) => {
    // const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();

    const changeTask = (task: TForm, id: string) => {
        dispatch(editTask(task, id));
        setActive(false)
    };

    const removeTask = (id: string) => {
        dispatch(deleteTask(id))
        setActive(false);
    }

    const allTasks = useAppSelector((state) => state.tasksReducer.allTasks);

    const task = allTasks.find(task => task.id === id);

    const saveTask = (task: TForm) => {
        dispatch(addTask(task));
        setActive(false)
    };

    // const inputDisabled = Boolean(task?.id) && disabled;

    if (!task) {
        return (
            <Modal active={active} saveTask={saveTask} onClose={onClose} />
        )
    }

    return (
        <Modal active={active} task={task} editTask={changeTask} removeTask={removeTask} onClose={onClose} />
    )
}

export default ModalContainer;