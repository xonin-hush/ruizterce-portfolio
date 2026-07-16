import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./i18n";
import FullPage from "./components/FullPage";
import WorkDetail from "./components/WorkDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FullPage />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
