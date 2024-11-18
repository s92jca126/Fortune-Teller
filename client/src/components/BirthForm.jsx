import { useState } from "react";
import axios from "axios";

function BirthForm() {
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchAPI = async () =>{
    const response = await axios.get("http://127.0.0.1:8080/answer");
    console.log(response.data)
  }

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


  

  return (
  
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="dateOfBirth" className="form-label">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth" 
          className= "form-control"
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
          className= "form-control"
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
          className= "form-control"
          value={formData.placeOfBirth}
          onChange={handleChange}
          placeholder="Enter city or location"
        />
      </div>
      <button type="submit" className="btn btn-outline-info">Submit</button>
    </form>
  );
}

export default BirthForm;
