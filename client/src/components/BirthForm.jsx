import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BirthForm() {
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract fields from formData
    const { dateOfBirth, timeOfBirth, placeOfBirth, gender } = formData;

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
    // console.log("birthData:", birthDataStr);

    try {
      // Send form data to backend
      const response = await axios.post("http://127.0.0.1:8080/submit", {
        birth_data: birthDataStr,
        question: "What will my career look like next year?", // TODO: KAN-14
      });

      // Navigate to the result page with prediction data as state
      navigate("/result", { state: { prediction: response.data.prediction } });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="dateOfBirth" className="form-label">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className="form-control"
            value={formData.dateOfBirth}
            onChange={handleChange}
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
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
            <option value="prefer-not-to-say">Prefer Not to Say</option>
          </select>
        </div>
        <button type="submit" className="btn btn-outline-info">
          Submit
        </button>
      </form>
    </>
  );
}

export default BirthForm;
