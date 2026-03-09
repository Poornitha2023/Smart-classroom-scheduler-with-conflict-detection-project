import React, { useState, useEffect } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const timeSlots = [
  "09:30 - 10:30",
  "10:30 - 11:30",
  "11:30 - 12:30",
  "12:30 - 01:30",
  "01:30 - 02:30",
  "02:30 - 03:30",
  "03:30 - 04:30",
];

function TimetablePage() {

  // ✅ store backend schedule
  const [schedule, setSchedule] = useState([]);

  const [selectedProgram, setSelectedProgram] = useState("");



  // ✅ LOAD schedule from MongoDB
  useEffect(() => {

    fetch("http://localhost:5000/api/schedule")

      .then(res => res.json())

      .then(data => {

        console.log(data);

        setSchedule(data);

      })

      .catch(err => console.log(err));

  }, []);




  // ✅ Get unique programs dynamically
  const programs = [...new Set(schedule.map((s) => s.program))];



  // ✅ Filter schedule based on selected program
  const filteredSchedule = selectedProgram

    ? schedule.filter((s) => s.program === selectedProgram)

    : [];



  // ✅ Get unique rooms
  const rooms = [...new Set(filteredSchedule.map((s) => s.room))];



  return (

    <div style={pageStyle}>

      <h1 style={headingStyle}>Program & Room Wise Timetable</h1>



      {/* Program Dropdown */}

      <div style={{ marginBottom: "20px" }}>

        <select

          value={selectedProgram}

          onChange={(e) => setSelectedProgram(e.target.value)}

          style={dropdownStyle}

        >

          <option value="">Select Program</option>

          {programs.map((prog, index) => (

            <option key={index} value={prog}>

              {prog}

            </option>

          ))}

        </select>

      </div>



      {!selectedProgram ? (

        <p style={{ color: "white" }}>Please select a program.</p>

      ) : rooms.length === 0 ? (

        <p style={{ color: "white" }}>No schedule available.</p>

      ) : (

        rooms.map((room, index) => (

          <div key={index} style={roomContainer}>

            <h2 style={roomHeading}>Room: {room}</h2>



            <table style={tableStyle}>

              <thead>

                <tr>

                  <th style={thStyle}>Time</th>

                  {days.map((day, i) => (

                    <th key={i} style={thStyle}>

                      {day}

                    </th>

                  ))}

                </tr>

              </thead>



              <tbody>

                {timeSlots.map((time, i) => (

                  <tr key={i}>

                    <td style={tdStyle}>{time}</td>



                    {days.map((day, j) => {

                      const entry = filteredSchedule.find(

                        (s) =>

                          s.room === room &&

                          s.day === day &&

                          s.time === time

                      );



                      return (

                        <td key={j} style={tdStyle}>

                          {entry ? (

                            <div>

                              <b>{entry.subject}</b>

                              <br />

                              {entry.facultyName}

                            </div>

                          ) : "-"}

                        </td>

                      );

                    })}

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ))

      )}

    </div>

  );

}



/* STYLES */

const pageStyle = {

  padding: "20px",

  minHeight: "100vh",

  backgroundColor: "#0b1d33",

};



const headingStyle = {

  color: "#ffffff",

  marginBottom: "20px",

};



const dropdownStyle = {

  padding: "10px",

  borderRadius: "6px",

  fontSize: "14px",

};



const roomContainer = {

  marginBottom: "40px",

  backgroundColor: "#132a45",

  padding: "15px",

  borderRadius: "10px",

};



const roomHeading = {

  color: "#1e90ff",

  marginBottom: "15px",

};



const tableStyle = {

  width: "100%",

  borderCollapse: "collapse",

};



const thStyle = {

  backgroundColor: "#1f3b5c",

  color: "#ffffff",

  padding: "10px",

  border: "1px solid #2f4f6f",

};



const tdStyle = {

  padding: "8px",

  border: "1px solid #2f4f6f",

  color: "#e6eef6",

  textAlign: "center",

};



export default TimetablePage;