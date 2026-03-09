import React, { useState } from "react";

const rooms = ["Room A", "Room B", "Room C", "Lab 1", "Lab 2"];

const slots = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "01:00 - 02:00",
  "02:00 - 03:00",
];

// Dummy occupied data (later can come from backend)
const occupied = {
  "Room A": ["09:00 - 10:00"],
  "Room B": ["11:00 - 12:00"],
  "Lab 1": ["10:00 - 11:00", "01:00 - 02:00"],
};

function SuggestionPage() {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);

  const checkAvailability = () => {
    if (!selectedSlot) return;

    const freeRooms = rooms.filter(
      (room) => !occupied[room]?.includes(selectedSlot)
    );

    setAvailableRooms(freeRooms);
  };

  return (
    <div style={containerStyle}>
      <h2>🔍 Available Rooms & Slots</h2>

      <div style={cardStyle}>
        <label style={labelStyle}>Select Time Slot</label>
        <select
          style={selectStyle}
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
        >
          <option value="">-- Select Slot --</option>
          {slots.map((slot, i) => (
            <option key={i}>{slot}</option>
          ))}
        </select>

        <button style={btnStyle} onClick={checkAvailability}>
          Check Availability
        </button>
      </div>

      {availableRooms.length > 0 && (
        <div style={resultStyle}>
          <h3>✅ Available Rooms</h3>
          <ul>
            {availableRooms.map((room, i) => (
              <li key={i}>🏫 {room}</li>
            ))}
          </ul>
        </div>
      )}

      {selectedSlot && availableRooms.length === 0 && (
        <p style={{ color: "#ffb3b3" }}>❌ No rooms available</p>
      )}
    </div>
  );
}

/* -------- styles -------- */

const containerStyle = {
  color: "#fff",
};

const cardStyle = {
  backgroundColor: "#112b5f",
  padding: "20px",
  borderRadius: "10px",
  maxWidth: "400px",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "bold",
};

const selectStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  marginBottom: "15px",
};

const btnStyle = {
  backgroundColor: "#4caf50",
  color: "#fff",
  border: "none",
  padding: "10px 15px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const resultStyle = {
  marginTop: "20px",
  backgroundColor: "#112b5f",
  padding: "15px",
  borderRadius: "10px",
};

export default SuggestionPage;
