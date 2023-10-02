import Modal from "../modal/Modal";
import { useAppSelector } from "../../hooks";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addTask, deleteTask } from "../../services/actions/actions";
import { ITask, TForm } from "../../types";

interface IModalContainer {
    active: boolean;
    setActive: (newValue: boolean) => void;
    id: string;
}

const ModalContainer = ({ active, setActive, id }: IModalContainer) => {
    const [disabled, setDisabled] = useState(false);

    const dispatch = useDispatch;

    const editTask = () => {
        setDisabled(false);
    };

    // const removeTask = (id: string) => {
    //     dispatch(deleteTask(id))
    // }

    const allTasks = useAppSelector((state) => state.tasksReducer.allTasks);

    const task = allTasks.find(task => task.id === id);

    // const saveTask = (task: TForm) => {
    //     setDisabled(true);
    //     dispatch(addTask(task))
    // };

    if (!task) {
        return null;
    }

    return (
        <Modal active={active} setActive={setActive} task={task} editTask={editTask}/>
    )
}

export default ModalContainer;