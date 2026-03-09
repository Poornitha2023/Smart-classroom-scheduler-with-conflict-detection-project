import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ setLoggedIn, setUsername }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (user && password) {
      setLoggedIn(true);
      setUsername(user);
      navigate("/");
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* LEFT SIDE */}
        <div style={leftStyle}>
          <div>
            <div style={capStyle}>🎓</div>
            <h2>Smart Classroom</h2>
            <p>Streamlining academic schedules with precision.</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={rightStyle}>
          <h2>Login</h2>
          <p style={{ marginBottom: "20px", color: "#666" }}>
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={handleLogin}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              style={inputStyle}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />

            <button type="submit" style={loginBtnStyle}>
              LOG IN
            </button>
          </form>

          <button
            style={signupBtnStyle}
            onClick={() => navigate("/signup")}
          >
            NEW HERE? CREATE ACCOUNT
          </button>

          <p style={footerTextStyle}>
            Developed by <b>Poornitha Reddy</b>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #2b59c3, #3a7bd5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  display: "flex",
  width: "850px",
  height: "470px",
  backgroundColor: "#fff",
  borderRadius: "18px",
  overflow: "hidden",
  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
};

const leftStyle = {
  flex: 1,
  backgroundColor: "#0b1d3a",
  color: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "30px",
};

/* 🔥 BIG 🎓 ICON */
const capStyle = {
  fontSize: "120px",
  marginBottom: "15px",
  lineHeight: "1",
  textShadow: "0 4px 15px rgba(255,255,255,0.3)",
};

const rightStyle = {
  flex: 1,
  padding: "40px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0 15px 0",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
};

const loginBtnStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#2b59c3",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};

const signupBtnStyle = {
  width: "100%",
  marginTop: "12px",
  padding: "10px",
  backgroundColor: "#fff",
  border: "2px solid #2b59c3",
  color: "#2b59c3",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
};

const footerTextStyle = {
  marginTop: "25px",
  fontSize: "13px",
  textAlign: "center",
  color: "#555",
};

export default LoginPage;
