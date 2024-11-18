import { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="timeOfBirth">Time of Birth:</label>
        <input
          type="time"
          id="timeOfBirth"
          name="timeOfBirth"
          value={formData.timeOfBirth}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="placeOfBirth">Place of Birth:</label>
        <input
          type="text"
          id="placeOfBirth"
          name="placeOfBirth"
          value={formData.placeOfBirth}
          onChange={handleChange}
          placeholder="Enter city or location"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default BirthForm;
