import React from "react";

function CalendarView({ schedule }) {
  return (
    <div style={box}>
      <h3>📅 Calendar View</h3>

      {schedule.length === 0 ? (
        <p>No schedules to display</p>
      ) : (
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Time</th>
              <th style={th}>Course</th>
              <th style={th}>Faculty</th>
              <th style={th}>Room</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((s, i) => (
              <tr key={i}>
                <td style={td}>{s.time}</td>
                <td style={td}>{s.course}</td>
                <td style={td}>{s.facultyId}</td>
                <td style={td}>{s.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const box = {
  marginTop: "30px",
  backgroundColor: "#132a45",
  padding: "20px",
  borderRadius: "10px",
  color: "#fff",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const th = {
  padding: "10px",
  backgroundColor: "#1f3b5c",
};

const td = {
  padding: "8px",
  borderBottom: "1px solid #2f4f6f",
  textAlign: "center",
};

export default CalendarView;
