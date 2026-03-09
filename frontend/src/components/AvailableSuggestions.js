import React from "react";

function AvailableSuggestions({ schedule, rooms, timeSlots }) {
  // Get used rooms & times
  const usedRooms = schedule.map((s) => s.room);
  const usedTimes = schedule.map((s) => s.time);

  const freeRooms = rooms.filter((r) => !usedRooms.includes(r));
  const freeSlots = timeSlots.filter((t) => !usedTimes.includes(t));

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Suggestions</h3>

      {/* AVAILABLE ROOMS */}
      <div style={sectionStyle}>
        <h4>Available Classrooms</h4>
        {freeRooms.length === 0 ? (
          <p style={warningStyle}>No classrooms available</p>
        ) : (
          freeRooms.map((room) => (
            <div key={room} style={itemStyle}>
              🏫 {room}
            </div>
          ))
        )}
      </div>

      {/* AVAILABLE SLOTS */}
      <div style={sectionStyle}>
        <h4>Available Time Slots</h4>
        {freeSlots.length === 0 ? (
          <p style={warningStyle}>No time slots available</p>
        ) : (
          freeSlots.map((slot) => (
            <div key={slot} style={itemStyle}>
              ⏰ {slot}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const containerStyle = {
  marginTop: "30px",
  padding: "20px",
  backgroundColor: "#132a45",
  borderRadius: "10px",
  color: "#ffffff",
};

const titleStyle = {
  marginBottom: "15px",
  borderBottom: "1px solid #2f4f6f",
  paddingBottom: "6px",
};

const sectionStyle = {
  marginBottom: "15px",
};

const itemStyle = {
  backgroundColor: "#0f243d",
  padding: "8px",
  marginBottom: "6px",
  borderRadius: "6px",
};

const warningStyle = {
  color: "#ffb3b3",
};

export default AvailableSuggestions;
