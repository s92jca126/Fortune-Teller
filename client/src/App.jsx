import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BirthForm from "./components/BirthForm";
import PredictionResult from "./components/PredictionResult";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BirthForm />} />
        <Route path="/result" element={<PredictionResult />} />
      </Routes>
    </Router>
  );
}

export default App;
