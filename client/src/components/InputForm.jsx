import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./InputForm.css";
import { TypeAnimation } from "react-type-animation";
import getBaseURL from "../utils/getBaseURL";

const baseURL = getBaseURL();

function InputForm() {
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    gender: "",
    question: "What does my future hold?",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Extract fields from formData
    const { dateOfBirth, timeOfBirth, placeOfBirth, gender, question } =
      formData;
    console.log("formData:", formData);

    // Format the date and create the string
    const dateTime = new Date(`${dateOfBirth}T${timeOfBirth}`);
    const formattedDateTime = dateTime.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    const birthDataStr = `A ${gender} born on ${formattedDateTime}, in ${placeOfBirth}`;

    try {
      // Save birthDataStr to localStorage for later use
      localStorage.setItem("birthData", birthDataStr);

      // Send form data to backend
      const response = await axios.post(`${baseURL}/submit`, {
        birth_data: birthDataStr,
        question: question,
      });

      // Navigate to the result page with prediction data as state
      navigate("/result", {
        state: { prediction: response.data.prediction, loading: false },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-white mb-4 text-4xl lg:text-6xl font-extrabold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Welcom to Fortune Teller,{" "}
        </span>
        <br />
        <TypeAnimation
          sequence={[
            "Fill below form",
            5000,
            "Talk to our AI agent",
            5000,
            "Reveal your fortune",
            5000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </h1>
      <div
        style={{
          fontSize: "1.2rem",
          fontWeight: "600",
          color: "#eaeaea",
          textAlign: "center",
          marginBottom: "20px",
          lineHeight: "1.6",
          letterSpacing: "0.5px",
        }}
        className="initial"
      >
        <p>
          Please provide your birth details and question to uncover your future.
        </p>
      </div>
      <form className="submitForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="dateOfBirth" className="form-label">
            <span>Date of Birth:</span>
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className="form-control"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="timeOfBirth" className="form-label">
            Time of Birth:
          </label>
          <input
            type="time"
            id="timeOfBirth"
            name="timeOfBirth"
            className="form-control"
            value={formData.timeOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="placeOfBirth" className="form-label">
            Place of Birth:
          </label>
          <input
            type="text"
            id="placeOfBirth"
            name="placeOfBirth"
            className="form-control"
            value={formData.placeOfBirth}
            onChange={handleChange}
            placeholder="Enter city or location"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            className="form-select"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
            <option value="prefer-not-to-say">Prefer Not to Say</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="question" className="form-label">
            Question:
          </label>
          <textarea
            id="question"
            name="question"
            className="form-control"
            value={formData.question}
            onChange={handleChange}
            required
            placeholder="What does my future hold?"
          ></textarea>
        </div>
        <div className="submitButton">
          <button type="submit" className="btn btn-outline-info">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}

export default InputForm;
