import { useState, useRef, useEffect, ChangeEvent } from "react";
import { useDispatch } from 'react-redux';
import { addTask } from "../../services/actions/actions";

interface IModal {
  active: boolean;
  setActive: (newValue: boolean) => void;
}

const Modal = ({ active, setActive }: IModal) => {

  const [value, setValue] = useState({
    summary: "",
    priority: "",
    description: "",
    commecement: "",
    days: "",
    completion: "",
    files: "",
    comments: "",
  });

  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  const editTask = () => {
    setDisabled(false);
  };

  const saveTask = () => {
    setDisabled(true);
    dispatch(addTask(value))
  };

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
            disabled={disabled}
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
            disabled={disabled}
          />
        </label>
        <label>
          Commecement date:
          <input
            onChange={onChange}
            value={value.commecement}
            name={"commecement"}
            placeholder="Commecement date"
            type="date"
            disabled={disabled}
          />
        </label>
        <label>
          At work:
          <input
            onChange={onChange}
            value={value.days}
            name={"days"}
            placeholder="At work"
            type="text"
            disabled={disabled}
          />
        </label>
        <label>
          Сompletion date:
          <input
            onChange={onChange}
            value={value.completion}
            name={"Сompletion"}
            placeholder="Сompletion date"
            type="date"
            disabled={disabled}
          />
        </label>
        <p>
          Priority:
          <label>
            <input type="radio" name="myRadio" value="High" />High
          </label>
          <label>
            <input type="radio" name="myRadio" value="Medium" />Medium
          </label>
          <label>
            <input type="radio" name="myRadio" value="Low" />Low
          </label>
        </p>
        <label>
          <input
            name={"file"}
            type="file"
            disabled={disabled}
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
        <button onClick={saveTask}>Save</button>
      </div>
      <button onClick={closeModal}>close</button>
    </dialog>
  );
};

export default Modal;
