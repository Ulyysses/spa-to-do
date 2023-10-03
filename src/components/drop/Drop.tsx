import { ReactNode } from 'react';
import { useDrop } from "react-dnd";
import { Status, TForm } from '../../types';
import { useDispatch } from 'react-redux';
import { editTask } from '../../services/actions/actions';

interface IDrop {
    children: ReactNode;
    status: Status;
}

const Drop = ({ children, status }: IDrop) => {
    const dispatch = useDispatch();

    const [{ isHover }, dropTarget] = useDrop({
        accept: "task",
        drop(item: {
            id: string;
        }) {
            dispatch(editTask({ status: status }, item.id))
        },
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
    });

    return (
        <div ref={dropTarget}>
            {children}
        </div>
    )
}

export default Drop;