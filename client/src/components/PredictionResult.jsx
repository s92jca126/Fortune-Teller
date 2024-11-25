import React from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

function PredictionResult() {
  const location = useLocation();
  const { prediction } = location.state || {};

  return (
    <div className="container mt-5">
      <h1>Prediction Result</h1>
      {prediction ? (
        <div className="text-start">
          {" "}
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {prediction}
          </ReactMarkdown>
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
