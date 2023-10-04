import { useState, useRef, useEffect, ChangeEvent } from "react";

import { ITask, Priority, Status, TForm } from "../../types";
import css from "./index.module.scss";
import dayjs from "dayjs";
interface IModal {
  active: boolean;
  task?: ITask;
  editTask?: (value: TForm, id: string) => void;
  removeTask?: (value: string) => void;
  saveTask?: (value: TForm) => void;
  onClose: () => void;
}

const Modal = ({
  active,
  task,
  editTask,
  removeTask,
  saveTask,
  onClose,
}: IModal) => {

  const initialState = {
    summary: task?.summary ?? "",
    subTasks: task?.subTasks ?? [],
    priority: task?.priority ?? Priority.Medium,
    description: task?.description ?? "",
    startDate: task?.startDate ?? null,
    endDate: task?.endDate ?? null,
    status: task?.status ?? Status.Queue,
    files: task?.files ?? [],
    comments: task?.comments ?? ""
  };

  const [value, setValue] = useState(initialState);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = () => {
    ref.current?.close();
  };

  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (active) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [active]);

  useEffect(() => {
    setValue(initialState);
  }, [active]);

  useEffect(() => {
    ref.current?.addEventListener("close", onClose);

    return () => ref.current?.removeEventListener("close", onClose);
  }, [onClose, ref]);

  const countDays = () => {
    const diff = dayjs(value.endDate)?.diff(dayjs(value.startDate), 'day');
    const days = diff !== undefined ? diff + 1 : undefined;
    return days === 1 ? '1 day' : days !== undefined ? `${days} days` : '';
  };

  return (
    <dialog ref={ref}>
      <div className={css.modal_container}>
        <label className={css.label}>
          Summary:
          <input
            onChange={onChange}
            value={value.summary}
            name={"summary"}
            placeholder="Summary"
            type="text"
            className={css.summary_input}
          />
        </label>
        <label className={css.label}>
          Description:
          <input
            onChange={onChange}
            value={value.description}
            name={"description"}
            placeholder="Description"
            type="text"
            className={css.description_input}
          />
        </label>
        {value.startDate && <p className={css.date}>Start: {dayjs(value.startDate).format('DD/MM/YYYY')}</p>}
        {value.endDate && <p className={css.date}>End: {dayjs(value.endDate).format('DD/MM/YYYY')}</p>}
        {value.endDate && <p className={css.date}>Time at work: {countDays()}</p>}
        <div>
          Priority:
          <label>
            <input
              type="radio"
              name="priority"
              value={Priority.Low}
              onChange={onChange}
              checked={value.priority === Priority.Low}
            />
            Low
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value={Priority.Medium}
              onChange={onChange}
              checked={value.priority === Priority.Medium}
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value={Priority.High}
              onChange={onChange}
              checked={value.priority === Priority.High}
            />
            High
          </label>
        </div>
        <label>
          <input name={"file"} type="file" />
        </label>
        {/* <button>+</button> */}
        <label className={css.label}>
          Comments:
          <input
            onChange={onChange}
            value={value.comments}
            name={"comments"}
            type="text"
            className={css.comments_input}
          />
        </label>
        <div className={css.buttons_container}>
          {saveTask && (
            <button
              onClick={() => saveTask(value)}
              className={css.modal_button}
            >
              Save
            </button>
          )}
          {editTask && task?.id && (
            <button
              onClick={() => editTask(value, task.id)}
              className={css.modal_button}
            >
              Edit
            </button>
          )}
          {removeTask && task?.id && (
            <button
              onClick={() => removeTask(task.id)}
              className={css.modal_button}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <button onClick={handleClose} className={css.close_button}>
        Х
      </button>
    </dialog>
  );
};

export default Modal;

