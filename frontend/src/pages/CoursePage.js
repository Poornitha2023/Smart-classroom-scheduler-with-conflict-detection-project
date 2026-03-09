import React, { useEffect, useState } from "react";

function CoursePage() {

  const [faculties, setFaculties] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState("");

  // ================= LOAD FACULTY DATA =================
  useEffect(() => {
    fetch("http://localhost:5000/api/faculty")
      .then(res => res.json())
      .then(data => setFaculties(data));
  }, []);

  // ================= GET UNIQUE PROGRAMS =================
  const programs = [...new Set(faculties.map(f => f.program))];

  // ================= FILTER DATA =================
  const filteredData = selectedProgram
    ? faculties.filter(f => f.program === selectedProgram)
    : faculties;

  return (
    <div style={container}>

      <h2 style={heading}>Course Assignment</h2>

      {/* PROGRAM DROPDOWN */}
      <select
        style={dropdown}
        value={selectedProgram}
        onChange={(e) => setSelectedProgram(e.target.value)}
      >
        <option value="">Select Program</option>
        {programs.map((prog, index) => (
          <option key={index} value={prog}>
            {prog}
          </option>
        ))}
      </select>

      {/* TABLE */}
      {filteredData.length === 0 ? (
        <p style={{ marginTop: "20px" }}>No data available</p>
      ) : (
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Faculty Name</th>
              <th style={th}>Assigned Subject</th>
              <th style={th}>Year</th>
              <th style={th}>Branch</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((f) => (
              <tr key={f._id}>
                <td style={td}>{f.name}</td>
                <td style={td}>{f.subject}</td>
                <td style={td}>{f.year}</td>
                <td style={td}>{f.branch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}

export default CoursePage;


// ================= STYLES =================

const container = {
  padding: "20px",
  background: "#0b1d33",
  minHeight: "100vh",
  color: "white"
};

const heading = {
  marginBottom: "20px"
};

const dropdown = {
  padding: "10px",
  width: "250px",
  marginBottom: "20px"
};

const table = {
  borderCollapse: "collapse",
  width: "90%"
};

const th = {
  border: "1px solid white",
  padding: "10px"
};

const td = {
  border: "1px solid white",
  padding: "10px"
};