import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PredictionResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction } = location.state || {};

  return (
    <div className="container mt-5">
      <h1>Prediction Result</h1>
      {prediction ? (
        <div>
          <p>{prediction}</p>
        </div>
      ) : (
        <div className="alert alert-danger">
          <p>No prediction data found. Please go back and try again.</p>
        </div>
      )}
    </div>
  );
}

export default PredictionResult;
