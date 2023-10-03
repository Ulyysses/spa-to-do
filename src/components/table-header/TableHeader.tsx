import css from "../table-header/index.module.scss";

const TableHeader = () => {
  return (
    <ul className={css.header_list}>
      <li className={css.header_item}>Queue</li>
      <li className={css.header_item}>Development</li>
      <li className={css.header_item}>Done</li>
    </ul>
  );
};

export default TableHeader;