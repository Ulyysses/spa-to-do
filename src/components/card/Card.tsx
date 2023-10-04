import { useDrag } from "react-dnd";

import { Priority } from "../../types";

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
    <div ref={dragRef}>
      <p>{id}</p>
      <p>{summary}</p>
      <p>{priority}</p>
    </div>
  );
};

export default Card;
