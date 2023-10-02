import { useState, useRef, useEffect, ChangeEvent } from "react";
import { useDispatch } from 'react-redux';
import { addTask, deleteTask } from "../../services/actions/actions";
import { ITask, Priority, Status } from "../../types";

interface IModal {
  active: boolean;
  setActive: (newValue: boolean) => void;
  task: ITask;
  editTask: () => void;
}

const Modal = ({active, setActive, task, editTask}: IModal) => {

  const [value, setValue] = useState({
    summary: task.summary ?? "",
    subTasks: task.subTasks ?? [], 
    priority: task.priority ?? Priority.Low,
    description: task.description ?? "",
    startDate: task.startDate ?? "",
    endDate: task.endDate ?? "",
    status: task.status ?? Status.Queue,
    files: task.files ?? [],
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const closeModal = () => {
    setActive(false);
  };

  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (active) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [active]);

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
            disabled
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
            disabled
          />
        </label>
        <label>
          Commecement date:
          <input
            onChange={onChange}
            value={value.startDate}
            name={"commecement"}
            placeholder="Commecement date"
            type="date"
            disabled
          />
        </label>
        <label>
          Сompletion date:
          <input
            onChange={onChange}
            value={value.endDate}
            name={"Сompletion"}
            placeholder="Сompletion date"
            type="date"
            disabled
          />
        </label>
        <p>
          Priority:
          <label>
            <input type="radio" name="priority" value="Low" onChange={onChange}/>Low
          </label>
          <label>
            <input type="radio" name="priority" value="Medium" onChange={onChange}/>Medium
          </label>
          <label>
            <input type="radio" name="priority" value="High" onChange={onChange}/>High
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
        <button>+</button>
        <p>Comments:</p>
        <button onClick={editTask}>Edit</button>
        {/* {task.id && <button onClick={saveTask}>Save</button>}
        {task.id && <button onClick={removeTask}>Delete</button>} */}
      </div>
      <button onClick={closeModal}>close</button>
    </dialog>
  );
};

export default Modal;
