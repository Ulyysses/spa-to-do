import css from "./index.module.scss";

const MainPage = () => {
  return (
    <div className={css.wrapper}>
      <h1>My projects:</h1>
      <ul className={css.projects_list}>
        <li>
          <a href="/project-one" className={css.project}>
            Project "One"
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MainPage;
