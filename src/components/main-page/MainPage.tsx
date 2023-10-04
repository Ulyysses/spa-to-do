import css from "./index.module.scss";

const MainPage = () => {
  return (
    <div className={css.wrapper}>
      <h1>My projects:</h1>
      <ul className={css.projects_list}>
        <li>
          <a href="/project-one" className={css.project}>
            <img alt="gear" src="../../images/gear.png">
            </img>
            <p>Project "One"</p>
          </a>
        </li>
        <li>
          <a href="#" className={css.project}>
            <img alt="gear" src="../../images/gear.png" />
            <p>Project "Two"</p>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MainPage;
