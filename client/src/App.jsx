import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useContext } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import LoginSignup from './components/LoginSignup';
import PredictionResult from './components/PredictionResult';
import { AuthContext } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // To protect the questions route

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Router>
        <Routes>
          {/* Public Route for Login/Signup */}
          <Route path="/auth" element={<LoginSignup />} />

          {/* Protected Route for Questions */}
          <Route
            path="/"
            element={
              user ? (
                <ProtectedRoute>
                  <InputForm /> {/* Questions form goes here */}
                </ProtectedRoute>
              ) : (
                <Navigate to="/auth" /> // Redirect to login page if not logged in
              )
            }
          />

          {/* Protected Route for Result */}
          <Route
            path="/result"
            element={
              user ? (
                <ProtectedRoute>
                  <PredictionResult /> {/* The results page */}
                </ProtectedRoute>
              ) : (
                <Navigate to="/auth" /> // Redirect to login page if not logged in
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
