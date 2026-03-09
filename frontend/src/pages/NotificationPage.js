import React, { useState } from "react";

function NotificationPage() {
  const [notifications, setNotifications] = useState([
    "New timetable uploaded",
    "Faculty meeting at 2PM",
  ]);

  const [showInput, setShowInput] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const handleAddClick = () => {
    setShowInput(true);
  };

  const handleSave = () => {
    if (!newMessage.trim()) return;

    setNotifications([...notifications, newMessage]);
    setNewMessage("");
    setShowInput(false);
  };

  const handleCancel = () => {
    setShowInput(false);
    setNewMessage("");
  };

  return (
    <div style={container}>
      <h2>🔔 Notifications</h2>

      <button onClick={handleAddClick} style={btnStyle}>
        Add Notification
      </button>

      {/* 👇 Textbox appears when button clicked */}
      {showInput && (
        <div style={inputContainer}>
          <input
            type="text"
            placeholder="Enter notification..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={inputStyle}
          />
          <button onClick={handleSave} style={saveBtn}>
            Add
          </button>
          <button onClick={handleCancel} style={cancelBtn}>
            Cancel
          </button>
        </div>
      )}

      <ul style={list}>
        {notifications.map((note, index) => (
          <li key={index} style={item}>
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationPage;

// ===== Styles =====

const container = {
  color: "white",
};

const btnStyle = {
  backgroundColor: "#2b59c3",
  color: "white",
  border: "none",
  padding: "8px 12px",
  marginBottom: "15px",
  borderRadius: "6px",
  cursor: "pointer",
};

const inputContainer = {
  marginBottom: "15px",
};

const inputStyle = {
  padding: "8px",
  width: "250px",
  marginRight: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const saveBtn = {
  backgroundColor: "green",
  color: "white",
  border: "none",
  padding: "8px 10px",
  marginRight: "5px",
  borderRadius: "6px",
  cursor: "pointer",
};

const cancelBtn = {
  backgroundColor: "red",
  color: "white",
  border: "none",
  padding: "8px 10px",
  borderRadius: "6px",
  cursor: "pointer",
};

const list = {
  listStyle: "disc",
  paddingLeft: "20px",
};

const item = {
  marginBottom: "6px",
};