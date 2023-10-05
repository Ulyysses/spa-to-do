import { Link } from "react-router-dom";
import css from "./index.module.scss";

const MainPage = () => {
  return (
    <div className={css.wrapper}>
      <h1>My projects:</h1>
      <ul className={css.projects_list}>
        <li>
          <Link to="/spa-to-do/my-first-project" className={css.project}>
            My first project
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MainPage;
