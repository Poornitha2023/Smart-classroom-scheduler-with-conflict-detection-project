import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import FacultyPage from "./pages/FacultyPage";
import CoursePage from "./pages/CoursePage";
import SchedulePage from "./pages/SchedulePage";
import TimetablePage from "./pages/TimetablePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminPage from "./pages/AdminPage";
import NotificationPage from "./pages/NotificationPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  // ✅ GLOBAL STATES
  const [faculties, setFaculties] = useState([]);
  const [courses, setCourses] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [notifications, setNotifications] = useState([]);

  return (
    <Router>
      {/* ---------- TOP HEADER ---------- */}
      <div style={topBarStyle}>
        <h2 style={{ margin: 0 }}>Smart Classroom Scheduler</h2>

        <div style={topRightStyle}>
          {!loggedIn ? (
            <>
              <Link style={topBtnStyle} to="/login">Login</Link>
              <Link style={topBtnStyle} to="/signup">Signup</Link>
            </>
          ) : (
            <>
              <span style={userTopStyle}>
                👤 {username} ({role})
              </span>
              <button
                style={logoutBtnStyle}
                onClick={() => {
                  setLoggedIn(false);
                  setUsername("");
                  setRole("");
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* ---------- ROUTING ---------- */}
      {!loggedIn ? (
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage
                setLoggedIn={setLoggedIn}
                setUsername={setUsername}
                setRole={setRole}
              />
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="*"
            element={
              <LoginPage
                setLoggedIn={setLoggedIn}
                setUsername={setUsername}
                setRole={setRole}
              />
            }
          />
        </Routes>
      ) : role === "Admin" ? (
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<AdminPage />} />
        </Routes>
      ) : (
        <div style={layoutStyle}>
          {/* ---------- SIDEBAR ---------- */}
          <div style={sidebarStyle}>
            <nav style={menuStyle}>
              <Link style={menuLinkStyle} to="/">🏠 Dashboard</Link>
              <Link style={menuLinkStyle} to="/faculty">👨‍🏫 Faculty</Link>
              <Link style={menuLinkStyle} to="/courses">📚 Courses</Link>
              <Link style={menuLinkStyle} to="/schedule">🗓️ Schedule</Link>
              <Link style={menuLinkStyle} to="/timetable">⏰ Timetable</Link>
              <Link style={menuLinkStyle} to="/notifications">🔔 Notifications</Link>
            </nav>
          </div>

          {/* ---------- MAIN CONTENT ---------- */}
          <div style={contentStyle}>
            <Routes>
              <Route path="/" element={<Dashboard />} />

              {/* ✅ FACULTY PAGE */}
              <Route
                path="/faculty"
                element={
                  <FacultyPage
                    faculties={faculties}
                    setFaculties={setFaculties}
                    courses={courses}
                  />
                }
              />

              {/* ✅ COURSE PAGE (FIXED HERE) */}
              <Route
                path="/courses"
                element={
                  <CoursePage
                    courses={courses}
                    setCourses={setCourses}
                    faculties={faculties}   // ✅ IMPORTANT FIX
                  />
                }
              />

              {/* ✅ SCHEDULE PAGE */}
              <Route
                path="/schedule"
                element={
                  <SchedulePage
                    faculties={faculties}
                    courses={courses}
                    schedule={schedule}
                    setSchedule={setSchedule}
                    setNotifications={setNotifications}
                  />
                }
              />

              {/* ✅ TIMETABLE PAGE */}
              <Route
                path="/timetable"
                element={
                  <TimetablePage
                    schedule={schedule}
                    faculties={faculties}
                  />
                }
              />

              {/* ✅ NOTIFICATIONS */}
              <Route
                path="/notifications"
                element={
                  <NotificationPage
                    notifications={notifications}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

/* ---------- STYLES ---------- */

const topBarStyle = {
  height: "60px",
  backgroundColor: "#0b1d3a",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
};

const topRightStyle = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
};

const topBtnStyle = {
  color: "#fff",
  textDecoration: "none",
  backgroundColor: "#112b5f",
  padding: "6px 14px",
  borderRadius: "6px",
  fontWeight: "bold",
};

const logoutBtnStyle = {
  backgroundColor: "#ff4d4f",
  color: "#fff",
  border: "none",
  padding: "6px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const userTopStyle = {
  fontWeight: "bold",
};

const layoutStyle = {
  display: "flex",
  height: "calc(100vh - 60px)",
};

const sidebarStyle = {
  width: "230px",
  backgroundColor: "#0b1d3a",
  padding: "20px",
};

const menuStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const menuLinkStyle = {
  color: "#cdd9ff",
  textDecoration: "none",
  padding: "12px",
  borderRadius: "8px",
  backgroundColor: "#112b5f",
  fontWeight: "bold",
};

const contentStyle = {
  flex: 1,
  backgroundColor: "#0b1d3a",
  overflowY: "auto",
  padding: "20px",
};

export default App;
