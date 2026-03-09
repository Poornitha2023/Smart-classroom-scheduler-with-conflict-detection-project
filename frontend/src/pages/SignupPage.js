import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [strength, setStrength] = useState("");

  const checkStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[@$!%*?&]/.test(pwd)) score++;

    if (score <= 2) return "Weak";
    if (score === 3 || score === 4) return "Medium";
    return "Strong";
  };

  const isStrongPassword = (pwd) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return regex.test(pwd);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (!isStrongPassword(password)) {
      setPasswordError(
        "Password must include uppercase, lowercase, number & special character"
      );
      return;
    }

    setPasswordError("");
    alert("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* LEFT SIDE */}
        <div style={leftStyle}>
          <div>
            <div style={capStyle}>🎓</div>
            <h2>Smart Classroom</h2>
            <p>Create your account to get started.</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={rightStyle}>
          <h2>Sign Up</h2>

          <form onSubmit={handleSignup}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              required
            />

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
            />

            <label>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setStrength(checkStrength(e.target.value));
                  setPasswordError("");
                }}
                style={inputStyle}
                required
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                style={eyeStyle}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {/* Strength Meter */}
            {password && (
              <p
                style={{
                  fontSize: "13px",
                  marginTop: "-8px",
                  color:
                    strength === "Strong"
                      ? "green"
                      : strength === "Medium"
                      ? "orange"
                      : "red",
                }}
              >
                Password Strength: {strength}
              </p>
            )}

            {/* Error */}
            {passwordError && (
              <p style={{ color: "red", fontSize: "13px" }}>
                {passwordError}
              </p>
            )}

            <button type="submit" style={signupBtnStyle}>
              CREATE ACCOUNT
            </button>
          </form>

          <button
            style={loginBtnStyle}
            onClick={() => navigate("/login")}
          >
            ALREADY HAVE AN ACCOUNT? LOGIN
          </button>
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
  height: "500px",
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
};

const capStyle = {
  fontSize: "120px",
  lineHeight: "1",
};

const rightStyle = {
  flex: 1,
  padding: "40px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0 15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const eyeStyle = {
  position: "absolute",
  right: "12px",
  top: "12px",
  cursor: "pointer",
};

const signupBtnStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#2b59c3",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
};

const loginBtnStyle = {
  width: "100%",
  marginTop: "12px",
  padding: "10px",
  backgroundColor: "#fff",
  border: "2px solid #2b59c3",
  color: "#2b59c3",
  borderRadius: "8px",
  fontWeight: "bold",
};

export default SignupPage;
