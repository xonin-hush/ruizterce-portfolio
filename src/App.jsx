import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./i18n";
import FullPage from "./components/FullPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/portfolio" element={<FullPage />} />
      </Routes>
    </Router>
  );
}

export default App;
