import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./i18n";
import FullPage from "./components/FullPage";
import WorkDetail from "./components/WorkDetail";
import DoomLauncher from "./components/DoomLauncher";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FullPage />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
      </Routes>
      <DoomLauncher />
    </Router>
  );
}

export default App;
