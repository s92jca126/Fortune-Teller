import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PredictionResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction } = location.state || {};

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h1>Prediction Result</h1>
      {prediction ? (
        <div className="alert alert-success">
          <h4>Your Prediction:</h4>
          <p>{prediction}</p>
        </div>
      ) : (
        <div className="alert alert-danger">
          <p>No prediction data found. Please go back and try again.</p>
        </div>
      )}
      <button className="btn btn-primary mt-3" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
}

export default PredictionResult;
