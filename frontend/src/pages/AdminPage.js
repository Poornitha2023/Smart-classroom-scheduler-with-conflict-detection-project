import React from "react";

function AdminDashboard() {
  return (
    <div style={{ color: "white" }}>
      <h2>👨‍💼 Admin Dashboard</h2>

      <div style={cardContainer}>
        <div style={cardStyle}>
          <h3>Total Students</h3>
          <p>120</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Faculty</h3>
          <p>25</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Courses</h3>
          <p>15</p>
        </div>
      </div>
    </div>
  );
}

const cardContainer = {
  display: "flex",
  gap: "20px",
  marginTop: "20px"
};

const cardStyle = {
  backgroundColor: "#112b5f",
  padding: "20px",
  borderRadius: "10px",
  width: "200px",
  textAlign: "center"
};

export default AdminDashboard;
