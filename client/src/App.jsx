import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import ProjectDocumentation from "./components/pages-section/ProjectsSection.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/projects/:projectId" element={<ProjectDocumentation />} />
    </Routes>
  );
}

export default App;