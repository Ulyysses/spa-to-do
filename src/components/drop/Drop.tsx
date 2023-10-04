import { ReactNode } from 'react';
import classNames from "classnames";
import { useDrop } from "react-dnd";
import { useDispatch } from 'react-redux';

import { editTask } from '../../services/actions/actions';
import { Status } from '../../types';
import css from "./index.module.scss";

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
        <div ref={dropTarget} className={classNames(isHover && css.drop_hover)}>
            {children}
        </div>
    )
}

export default Drop;