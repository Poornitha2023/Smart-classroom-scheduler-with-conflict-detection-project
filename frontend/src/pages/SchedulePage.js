import React, { useState, useEffect } from "react";

// Days and time slots
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "09:30 - 10:30",
  "10:30 - 11:30",
  "11:30 - 12:30",
  "12:30 - 01:30",
  "01:30 - 02:30",
  "02:30 - 03:30",
];

function SchedulePage({ faculties }) {
  const [program, setProgram] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [subject, setSubject] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [room, setRoom] = useState("");
  const [schedule, setSchedule] = useState([]);

  // Fetch schedule from backend
  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/schedule");
      const data = await res.json();
      setSchedule(data);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  // Get unique programs from faculties
  const programs = [...new Set(faculties.map((f) => f.program))];

  // Filter faculties by selected program
  const filteredFaculties = faculties.filter((f) => f.program === program);

  // Get selected faculty details
  const selectedFaculty = faculties.find((f) => f.facultyId === facultyId);

  // Subject dropdown only shows the selected faculty’s subject
  const facultySubjects = selectedFaculty ? [selectedFaculty.subject] : [];

  const handleAddSchedule = async () => {
    if (!program || !facultyId || !subject || !day || !time || !room) {
      alert("Please fill all fields");
      return;
    }

    const facultyName = selectedFaculty ? selectedFaculty.name : "";

    const newSchedule = {
      program,
      facultyId,
      facultyName,
      subject,
      day,
      time,
      room,
    };

    try {
      const res = await fetch("http://localhost:5000/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSchedule),
      });

      const msg = await res.text();
      alert(msg);
      fetchSchedule();

      // Reset form
      setProgram("");
      setFacultyId("");
      setSubject("");
      setDay("");
      setTime("");
      setRoom("");
    } catch (error) {
      console.error("Error adding schedule:", error);
      alert("Failed to add schedule.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete schedule?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/schedule/${id}`, {
        method: "DELETE",
      });
      const msg = await res.text();
      alert(msg);
      fetchSchedule();
    } catch (error) {
      console.error("Error deleting schedule:", error);
      alert("Failed to delete schedule.");
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <h2 style={title}>Class Schedule</h2>

        {/* Program */}
        <select
          style={input}
          value={program}
          onChange={(e) => {
            setProgram(e.target.value);
            setFacultyId("");
            setSubject("");
          }}
        >
          <option value="">Select Program</option>
          {programs.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        {/* Faculty */}
        <select
          style={input}
          value={facultyId}
          onChange={(e) => {
            setFacultyId(e.target.value);
            setSubject("");
            const fac = faculties.find((f) => f.facultyId === e.target.value);
            if (fac) setProgram(fac.program); // sync program
          }}
          disabled={!program}
        >
          <option value="">Select Faculty</option>
          {filteredFaculties.map((f) => (
            <option key={f.facultyId} value={f.facultyId}>
              {f.name}
            </option>
          ))}
        </select>

        {/* Subject */}
        <select
          style={input}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={!facultyId || facultySubjects.length === 0}
        >
          <option value="">
            {facultySubjects.length === 0 ? "No subjects available" : "Select Subject"}
          </option>
          {facultySubjects.map((subj, idx) => (
            <option key={idx} value={subj}>
              {subj}
            </option>
          ))}
        </select>

        {/* Day */}
        <select style={input} value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="">Select Day</option>
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Time */}
        <select style={input} value={time} onChange={(e) => setTime(e.target.value)}>
          <option value="">Select Time</option>
          {timeSlots.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {/* Room */}
        <input
          style={input}
          type="text"
          placeholder="Enter Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />

        <button style={button} onClick={handleAddSchedule}>
          Add Schedule
        </button>
      </div>

      {/* Schedule Table */}
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Program</th>
            <th style={th}>Faculty</th>
            <th style={th}>Subject</th>
            <th style={th}>Day</th>
            <th style={th}>Time</th>
            <th style={th}>Room</th>
            <th style={th}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((s) => (
            <tr key={s._id}>
              <td style={td}>{s.program}</td>
              <td style={td}>{s.facultyName}</td>
              <td style={td}>{s.subject}</td>
              <td style={td}>{s.day}</td>
              <td style={td}>{s.time}</td>
              <td style={td}>{s.room}</td>
              <td style={td}>
                <button style={deleteBtn} onClick={() => handleDelete(s._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SchedulePage;

// ==== Styles ====
const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f1e3c, #1f3c88)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "40px 0",
  color: "white",
  fontFamily: "Arial, sans-serif",
};
const card = {
  backgroundColor: "#f4f4f4",
  padding: "30px 40px",
  width: "400px",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
  textAlign: "center",
  marginBottom: "40px",
  color: "#1f3c88",
};
const title = { marginBottom: "20px", fontWeight: "bold", fontSize: "24px" };
const input = { width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px" };
const button = { width: "100%", padding: "12px", backgroundColor: "#2d4db7", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" };
const table = { width: "90%", maxWidth: "900px", borderCollapse: "collapse", backgroundColor: "white", color: "black", borderRadius: "8px", overflow: "hidden", boxShadow: "0 5px 15px rgba(0,0,0,0.2)" };
const th = { border: "1px solid #ddd", padding: "12px", backgroundColor: "#1f3c88", color: "white", fontWeight: "bold", textAlign: "center" };
const td = { border: "1px solid #ddd", padding: "10px", textAlign: "center" };
const deleteBtn = { background: "red", color: "white", padding: "6px 10px", border: "none", borderRadius: "4px", cursor: "pointer" };