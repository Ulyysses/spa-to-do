import { Routes, Route } from "react-router-dom";

import MainPage from "../main-page/MainPage";
import ProjectOne from "../project";

const App = () => {
  return (
    <main className="container">
      <Routes>
        <Route path="/spa-to-do" element={<MainPage />} />
        <Route path="/spa-to-do/my-first-project" element={<ProjectOne />} />
      </Routes>
    </main>
  );
};

export default App;
