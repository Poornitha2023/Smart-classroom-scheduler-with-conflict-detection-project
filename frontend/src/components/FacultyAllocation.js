import React, { useState } from "react";

function FacultyAllocation() {
  const [faculties, setFaculties] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const handleAddFaculty = () => {
    if (!name || !course) {
      alert("Please fill all fields!");
      return;
    }
    setFaculties([...faculties, { name, course }]);
    setName("");
    setCourse("");
    alert("Faculty added successfully!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Faculty Allocation</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Faculty Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Course Name"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleAddFaculty} style={buttonStyle}>
          Add Faculty
        </button>
      </div>

      <ul>
        {faculties.map((f, index) => (
          <li key={index}>{f.name} - {f.course}</li>
        ))}
      </ul>
    </div>
  );
}

const inputStyle = {
  padding: "8px",
  marginRight: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "8px 12px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#4caf50",
  color: "#fff",
  cursor: "pointer",
};

export default FacultyAllocation;
