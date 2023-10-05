import css from "./index.module.scss";

const MainPage = () => {
  return (
    <div className={css.wrapper}>
      <h1>My projects:</h1>
      <ul className={css.projects_list}>
        <li>
          <a href="/spa-to-do/my-first-project" className={css.project}>
            My first project
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MainPage;
