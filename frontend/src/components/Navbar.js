import { Link } from "react-router-dom";

function Navbar({ loggedIn, setLoggedIn }) {
  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <nav
      style={{
        padding: "15px 30px",
        backgroundColor: "#263238", // Dark navbar background
        color: "#fff",              // White text
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      <div>
        <Link to="/" style={{ color: "#fff", marginRight: "15px", textDecoration: "none" }}>Dashboard</Link>
        {loggedIn && (
          <>
            <Link to="/faculty" style={{ color: "#fff", marginRight: "15px", textDecoration: "none" }}>Faculty</Link>
            <Link to="/courses" style={{ color: "#fff", marginRight: "15px", textDecoration: "none" }}>Courses</Link>
            <Link to="/schedule" style={{ color: "#fff", textDecoration: "none" }}>Schedule</Link>
          </>
        )}
      </div>
      <div>
        {loggedIn ? (
          <button
            onClick={handleLogout}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#ff5252",
              color: "#fff",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#e04848")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff5252")}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" style={{ color: "#fff", marginRight: "10px", textDecoration: "none" }}>Login</Link>
            <Link to="/signup" style={{ color: "#fff", textDecoration: "none" }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
