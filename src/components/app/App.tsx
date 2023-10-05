import { Routes, Route } from "react-router-dom";

import MainPage from "../main-page/MainPage";
import ProjectOne from "../project-one";

const App = () => {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/project-one" element={<ProjectOne />} />
      </Routes>
    </main>
  );
};

export default App;
