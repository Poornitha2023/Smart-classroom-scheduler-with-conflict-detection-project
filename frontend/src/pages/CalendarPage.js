import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarPage() {
  const [date, setDate] = useState(new Date());

  return (
    <div style={containerStyle}>
      <h2>📅 Academic Calendar</h2>
      <Calendar
        onChange={setDate}
        value={date}
      />
      <p style={{ marginTop: "20px" }}>
        Selected Date: <b>{date.toDateString()}</b>
      </p>
    </div>
  );
}

const containerStyle = {
  padding: "20px",
  color: "white"
};

export default CalendarPage;
