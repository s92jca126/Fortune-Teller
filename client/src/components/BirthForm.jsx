import { useState, useEffect } from "react";
import axios from "axios";

function BirthForm() {
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    gender: "", // Add gender to the form state
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchAPI = async () => {
    const response = await axios.get("http://127.0.0.1:8080/answer");
    console.log(response.data);
    setMessage(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    try {
      // Send form data to Flask backend
      const response = await axios.post("http://127.0.0.1:8080/submit", formData);
      console.log("Response from server:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="dateOfBirth" className="form-label">Date of Birth:</label>
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
          <label htmlFor="timeOfBirth" className="form-label">Time of Birth:</label>
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
          <label htmlFor="placeOfBirth" className="form-label">Place of Birth:</label>
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
          <label htmlFor="gender" className="form-label">Gender:</label>
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
        <button type="submit" className="btn btn-outline-info">Submit</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </>
  );
}

export default BirthForm;
