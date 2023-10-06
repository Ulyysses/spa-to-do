import { Routes, Route } from "react-router-dom";

import MainPage from "../main-page/MainPage";
import Project from "../project";

const App = () => {
  return (
    <main className="container">
      <Routes>
        <Route path="/spa-to-do" element={<MainPage />} />
        <Route path="/spa-to-do/:project" element={<Project />} />
      </Routes>
    </main>
  );
};

export default App;
