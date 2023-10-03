import { useState, useRef, useEffect, ChangeEvent } from "react";
import { addTask, deleteTask } from "../../services/actions/actions";
import { ITask, Priority, Status, TForm } from "../../types";

interface IModal {
  active: boolean;
  task?: ITask;
  editTask?: (value: TForm, id: string) => void;
  removeTask?: (value: string) => void;
  saveTask?: (value: TForm) => void;
  onClose: () => void;
}

const Modal = ({ active, task, editTask, removeTask, saveTask, onClose }: IModal) => {

  const initialState = {
    summary: task?.summary ?? "",
    subTasks: task?.subTasks ?? [],
    priority: task?.priority ?? Priority.Medium,
    description: task?.description ?? "",
    startDate: task?.startDate ?? "",
    endDate: task?.endDate ?? "",
    status: task?.status ?? Status.Queue,
    files: task?.files ?? [],
  }

  const [value, setValue] = useState(initialState);

  console.log(value);


  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name);

    console.log(event.target.value);

    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = () => {
    ref.current?.close();
  }

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
    ref.current?.addEventListener('close', onClose);

    return () => ref.current?.removeEventListener('close', onClose);

  }, [onClose, ref]);


  return (
    <dialog ref={ref}>
      <div>
        <label>
          Summary:
          <input
            onChange={onChange}
            value={value.summary}
            name={"summary"}
            placeholder="Summary"
            type="text"
          />
        </label>
        <label>
          Description:
          <input
            onChange={onChange}
            value={value.description}
            name={"description"}
            placeholder="Description"
            type="text"
          />
        </label>
        <p>
          Start: {value.startDate}
        </p>
        <p>
          End: {value.endDate}
        </p>
        <p>
          Priority:
          <label>
            <input type="radio" name="priority" value={Priority.Low} onChange={onChange} checked={value.priority === Priority.Low} />Low
          </label>
          <label>
            <input type="radio" name="priority" value={Priority.Medium} onChange={onChange} checked={value.priority === Priority.Medium} />Medium
          </label>
          <label>
            <input type="radio" name="priority" value={Priority.High} onChange={onChange} checked={value.priority === Priority.High} />High
          </label>
        </p>
        <label>
          <input
            name={"file"}
            type="file"
            disabled
          />
        </label>
        {/* <p>
          Status:
          <label>
            <input type="radio" name="myRadio2" value="Queue" />Queue
          </label>
          <label>
            <input type="radio" name="myRadio2" value="Development" />Development
          </label>
          <label>
            <input type="radio" name="myRadio2" value="Done" />Done
          </label>
        </p> */}
        <button>+</button>editTask
        <p>Comments:</p>
        {saveTask && <button onClick={() => saveTask(value)}>Save</button>}
        {editTask && task?.id && <button onClick={() => editTask(value, task.id)}>Edit</button>}
        {removeTask && task?.id && <button onClick={() => removeTask(task.id)}>Delete</button>}
      </div>
      <button onClick={handleClose}>close</button>
    </dialog>
  );
};

export default Modal;
