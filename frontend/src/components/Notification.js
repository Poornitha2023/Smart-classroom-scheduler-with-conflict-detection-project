import React from "react";

function Notification({ message, type }) {
  if (!message) return null;

  return (
    <div
      style={{
        padding: "12px",
        marginTop: "15px",
        borderRadius: "6px",
        backgroundColor: type === "error" ? "#ff4d4f" : "#2ecc71",
        color: "#fff",
        fontWeight: "bold",
      }}
    >
      {message}
    </div>
  );
}

export default Notification;