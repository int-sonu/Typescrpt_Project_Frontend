import type { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../global/axios";
import "../styles/navbar.css";

const Navbar: FC = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const handleLogout = async () => {
    try {
      await api.delete("/user/logout");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-links">

        <Link to="/" className="nav-link">Home</Link>

        {!user ? (
          <>
            <Link to="/signup" className="nav-link">Register</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </>
        ) : (
          <>
            <Link to="/task" className="nav-link">Create Task</Link>
            <Link to="/mytask" className="nav-link">My Tasks</Link>

            <button className="nav-link logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
