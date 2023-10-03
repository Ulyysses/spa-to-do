import { Priority } from "../../types";
import { useDrag } from "react-dnd";
import css from "../card/index.module.scss";

interface ICard {
  id: string;
  summary: string;
  priority: Priority;
}

const Card = ({ id, summary, priority }: ICard) => {
  const [, dragRef] = useDrag({
    type: "task",
    item: { id },
  });

  return (
    <div className={css.task_container} ref={dragRef}>
      <p>{id}</p>
      <p>{summary}</p>
      <p>{priority}</p>
    </div>
  );
};

export default Card;
