import React from "react";

// Example subjects
const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Python",
  "English",
  "AMSD",
  "DBMS",
  "JAVA",
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Time slots
const timeSlots = [
  "09:30 - 10:30",
  "10:30 - 11:30",
  "11:30 - 12:30",
  "12:30 - 01:30",
  "01:30 - 02:30",
  "02:30 - 03:30",
  "03:30 - 04:00",
];

// Helper to get random subject
const getRandomSubject = () => {
  return subjects[Math.floor(Math.random() * subjects.length)];
};

function Timetable() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ marginBottom: "20px", color: "#ffffff" }}>
        Academic Timetable
      </h1>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle}>Time</th>
            {days.map((day) => (
              <th key={day} style={headerStyle}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot) => (
            <tr key={slot}>
              <td style={timeStyle}>{slot}</td>
              {days.map((day) => (
                <td key={day + slot} style={subjectStyle}>
                  {getRandomSubject()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ===== Styles ===== */

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "center",
  backgroundColor: "#132a45",
};

const headerStyle = {
  border: "1px solid #39458b",
  padding: "12px",
  backgroundColor: "#1f3b5c",
  color: "#ffffff",
  fontWeight: "bold",
};

const timeStyle = {
  border: "1px solid #39458b",
  padding: "10px",
  color: "#dbe7ff",   // light color for time
  fontWeight: "500",
};

const subjectStyle = {
  border: "1px solid #39458b",
  padding: "10px",
  color: "#e6eef6",   // light subject color
};

export default Timetable;
