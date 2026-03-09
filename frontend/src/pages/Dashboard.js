import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Dashboard() {

  const [data, setData] = useState({
    faculty: 0,
    courses: 0,
    schedules: 0
  });

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  // Fetch dashboard data
  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  // Live Clock
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={container}>

      <h2>Dashboard</h2>

      {/* Cards */}
      <div style={cardContainer}>

        <div style={card}>
          <h3>Total Faculty</h3>
          <p>{data.faculty}</p>
        </div>

        <div style={card}>
          <h3>Total Courses</h3>
          <p>{data.courses}</p>
        </div>

        <div style={card}>
          <h3>Total Schedule</h3>
          <p>{data.schedules}</p>
        </div>

      </div>

      {/* Calendar Section */}
      <div style={calendarSection}>

        <div style={calendarBox}>
          <h3>Schedule</h3>

          <Calendar
            onChange={setDate}
            value={date}
            className="wide-calendar"
          />

          {/* Clock */}
          <div style={clockBox}>
            <h3>Current Time</h3>
            <p style={clockText}>
              {time.toLocaleTimeString()}
            </p>
          </div>

        </div>

      </div>

      {/* Custom Calendar Styling */}
      <style>{`
        .wide-calendar {
          width: 100% !important;
          font-size: 15px;
        }

        .wide-calendar .react-calendar__tile {
          padding: 12px 0;
        }

        .wide-calendar .react-calendar__navigation button {
          font-size: 16px;
          font-weight: bold;
        }

        .wide-calendar .react-calendar__month-view__weekdays {
          font-size: 14px;
          font-weight: bold;
        }
      `}</style>

    </div>
  );
}

export default Dashboard;


/* ================= STYLES ================= */

const container = {
  padding: "20px",
  color: "white"
};

const cardContainer = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap"
};

const card = {
  background: "#112b5f",
  padding: "20px",
  margin: "10px 0",
  width: "200px",
  borderRadius: "10px"
};

const calendarSection = {
  marginTop: "40px",
  display: "flex",
  justifyContent: "center"
};

const calendarBox = {
  background: "white",
  color: "black",
  padding: "20px",
  borderRadius: "12px",
  width: "700px"   // 👈 Increased Breadth (Width)
};

const clockBox = {
  marginTop: "20px",
  textAlign: "center"
};

const clockText = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#112b5f"
};