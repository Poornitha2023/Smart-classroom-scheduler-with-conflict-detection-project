import React, { useState, useEffect } from "react";

/* ================= PROGRAM → YEARS ================= */
const programYears = {
  BTECH: [1, 2, 3, 4],
  MTECH: [1, 2],
  BSC: [1, 2, 3],
  MBA: [1, 2],
  MCA: [1, 2, 3],
  BCA: [1, 2, 3],
  BCOM: [1, 2, 3],
  BA: [1, 2, 3],
};

/* ================= PROGRAM → BRANCH → YEAR → SUBJECTS ================= */
const academicData = {
  BTECH: {
    CSE: {
      1: ["Mathematics", "Physics", "C Programming", "English", "Engineering Drawing"],
      2: ["Data Structures", "OOPS", "Digital Logic", "Discrete Maths", "Computer Organization"],
      3: ["Operating Systems", "DBMS", "Computer Networks", "Software Engineering", "TOC"],
      4: ["Machine Learning", "Cloud Computing", "Cyber Security", "AI", "Project"],
    },
    ECE: {
      1: ["Mathematics", "Physics", "Basic Electrical", "C Programming", "English"],
      2: ["Digital Electronics", "Signals", "Network Theory", "Analog Circuits", "EMFT"],
      3: ["Microprocessors", "DSP", "Communication Systems", "Control Systems", "VLSI"],
      4: ["Embedded Systems", "Wireless Communication", "IoT", "Optical Comm", "Project"],
    },
    MECH: {
      1: ["Mathematics", "Physics", "Engineering Mechanics", "Workshop", "English"],
      2: ["Thermodynamics", "Material Science", "Fluid Mechanics", "Manufacturing", "Strength of Materials"],
      3: ["CAD", "Heat Transfer", "Machine Design", "Control Systems", "Dynamics"],
      4: ["Automobile Engineering", "Robotics", "Mechatronics", "Industrial Management", "Project"],
    },
    CIVIL: {
      1: ["Mathematics", "Physics", "Engineering Drawing", "Basic Civil Engg", "English"],
      2: ["Structural Analysis", "Surveying", "Fluid Mechanics", "Construction Materials", "Environmental Engg"],
      3: ["Concrete Technology", "Soil Mechanics", "Transportation Engg", "Hydraulics", "Project"],
      4: ["Project Management", "Advanced Structural Design", "Geotechnical Engg", "Urban Planning", "Project"],
    },
  },

  MBA: {
    FINANCE: {
      1: ["Accounting", "Marketing", "Economics", "OB", "Business Communication"],
      2: ["Investment Analysis", "Financial Management", "Risk Management", "Taxation", "Project"],
    },
    HR: {
      1: ["Organizational Behavior", "HRM", "Psychology", "Communication Skills", "Economics"],
      2: ["Performance Management", "Labour Laws", "Training & Development", "Conflict Management", "Project"],
    },
    MARKETING: {
      1: ["Principles of Marketing", "Consumer Behavior", "Advertising", "Economics", "Statistics"],
      2: ["Digital Marketing", "Brand Management", "Sales Management", "Market Research", "Project"],
    },
  },

  MCA: {
    GENERAL: {
      1: ["Programming", "Data Structures", "DBMS", "OS", "Maths"],
      2: ["Web Tech", "Software Engineering", "Cloud", "AI", "Networks"],
      3: ["Machine Learning", "Cyber Security", "Big Data", "Mobile Computing", "Project"],
    },
  },

  BSC: {
    PHYSICS: {
      1: ["Mechanics", "Electromagnetism", "Maths", "Chemistry", "Computer Basics"],
      2: ["Quantum Mechanics", "Thermodynamics", "Optics", "Programming", "Electronics"],
      3: ["Nuclear Physics", "Solid State Physics", "Statistical Mechanics", "Astrophysics", "Project"],
    },
    CHEMISTRY: {
      1: ["Inorganic Chemistry", "Organic Chemistry", "Maths", "Physics", "English"],
      2: ["Physical Chemistry", "Analytical Chemistry", "Biochemistry", "Lab Techniques", "Project"],
      3: ["Advanced Organic Chemistry", "Environmental Chemistry", "Industrial Chemistry", "Project", "Seminar"],
    },
    MATHS: {
      1: ["Calculus", "Algebra", "Statistics", "Computer Basics", "English"],
      2: ["Linear Algebra", "Probability", "Differential Equations", "Programming", "Mechanics"],
      3: ["Complex Analysis", "Number Theory", "Topology", "Statistics", "Project"],
    },
  },

  BCA: {
    GENERAL: {
      1: ["Programming Basics", "Mathematics", "English", "Computer Fundamentals", "Data Structures"],
      2: ["OOP", "Database Systems", "Web Development", "Networks", "Software Engineering"],
      3: ["Advanced Programming", "AI", "Cloud", "Cyber Security", "Project"],
    },
  },

  BCOM: {
    GENERAL: {
      1: ["Accounting", "Economics", "Business Maths", "English", "Computer Basics"],
      2: ["Corporate Accounting", "Statistics", "Business Law", "Finance", "Marketing"],
      3: ["Taxation", "Auditing", "Management", "Economics", "Project"],
    },
  },

  BA: {
    HISTORY: {
      1: ["Ancient History", "Medieval History", "Political Science", "English", "Sociology"],
      2: ["Modern History", "Economics", "Philosophy", "Geography", "Project"],
      3: ["World History", "Political Theory", "Psychology", "English Literature", "Seminar"],
    },
    ENGLISH: {
      1: ["Grammar", "Composition", "Literature I", "Communication Skills", "Poetry"],
      2: ["Literature II", "Linguistics", "Drama", "Prose", "Creative Writing"],
      3: ["Advanced Literature", "Critical Theory", "Modern Poetry", "Novel", "Project"],
    },
  },
};

/* ================= COMPONENT ================= */

function FacultyPage({ faculties, setFaculties }) {
  const [facultyId, setFacultyId] = useState("");
  const [name, setName] = useState("");
  const [program, setProgram] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState("");
  useEffect(() => {

  fetch("http://localhost:5000/api/faculty")

    .then(res => res.json())

    .then(data => setFaculties(data));

}, [setFaculties]);
  
   const handleAddFaculty = async () => {

  if (!facultyId || !name || !program || !year || !branch || !subject) {

    alert("Please fill all fields");

    return;

  }


  const newFaculty = {

    facultyId,

    name,

    program,

    year,

    branch,

    subject

  };


  // ✅ Send data to backend MongoDB

  await fetch("http://localhost:5000/api/faculty", {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

    },

    body: JSON.stringify(newFaculty),

  });


  // Optional: also update frontend display

  setFaculties([...faculties, newFaculty]);


  alert("Faculty saved in database");


  // Clear input fields

  setFacultyId("");

  setName("");

  setProgram("");

  setYear("");

  setBranch("");

  setSubject("");

};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Faculty Management</h2>

        <input style={styles.input} placeholder="Faculty ID" value={facultyId} onChange={e => setFacultyId(e.target.value)} />
        <input style={styles.input} placeholder="Faculty Name" value={name} onChange={e => setName(e.target.value)} />

        {/* PROGRAM */}
        <select
          style={styles.input}
          value={program}
          onChange={e => { setProgram(e.target.value); setYear(""); setBranch(""); setSubject(""); }}
        >
          <option value="">Select Program</option>
          {Object.keys(programYears).map(prog => <option key={prog} value={prog}>{prog}</option>)}
        </select>

        {/* YEAR */}
        <select
          style={styles.input}
          value={year}
          onChange={e => { setYear(e.target.value); setBranch(""); setSubject(""); }}
          disabled={!program}
        >
          <option value="">Select Year</option>
          {program && programYears[program].map(yr => <option key={yr} value={yr}>{yr} Year</option>)}
        </select>

        {/* BRANCH */}
        <select
          style={styles.input}
          value={branch}
          onChange={e => { setBranch(e.target.value); setSubject(""); }}
          disabled={!year}
        >
          <option value="">Select Branch</option>
          {program && year && Object.keys(academicData[program] || {}).map(br => <option key={br} value={br}>{br}</option>)}
        </select>

        {/* SUBJECT */}
        <select
          style={styles.input}
          value={subject}
          onChange={e => setSubject(e.target.value)}
          disabled={!branch}
        >
          <option value="">Select Subject</option>
          {program && branch && year && academicData[program]?.[branch]?.[year]?.map((sub, i) => <option key={i} value={sub}>{sub}</option>)}
        </select>

        <button style={styles.button} onClick={handleAddFaculty}>Add Faculty</button>
      </div>

      {/* TABLE */}
      <div style={styles.tableCard}>
        <h3 style={styles.subHeading}>Faculty List</h3>
        {faculties.length === 0 ? (
          <p style={{ textAlign: "center" }}>No faculty added yet.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Faculty ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Program</th>
                <th style={styles.th}>Year</th>
                <th style={styles.th}>Branch</th>
                <th style={styles.th}>Subject</th>
              </tr>
            </thead>
            <tbody>
              {faculties.map((f, i) => (
                <tr key={i}>
                  <td style={styles.td}>{f.facultyId}</td>
                  <td style={styles.td}>{f.name}</td>
                  <td style={styles.td}>{f.program}</td>
                  <td style={styles.td}>{f.year}</td>
                  <td style={styles.td}>{f.branch}</td>
                  <td style={styles.td}>{f.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default FacultyPage;

/* ================= STYLES ================= */
const styles = {
  container: { minHeight: "100vh", background: "linear-gradient(135deg, #0f172a, #1e3a8a)", padding: "40px" },
  card: { backgroundColor: "#ffffff", padding: "25px", width: "420px", margin: "0 auto 40px auto", borderRadius: "10px", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" },
  heading: { textAlign: "center", marginBottom: "20px", color: "#1e3a8a" },
  subHeading: { textAlign: "center", marginBottom: "15px", color: "#1e3a8a" },
  input: { width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px" },
  button: { width: "100%", padding: "10px", backgroundColor: "#1e40af", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
  tableCard: { backgroundColor: "#ffffff", padding: "25px", borderRadius: "10px", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { backgroundColor: "#1e3a8a", color: "white", padding: "10px", border: "1px solid #ccc" },
  td: { padding: "8px", border: "1px solid #ccc", textAlign: "center" },
};
