import { Link } from "react-router-dom";
import "../styles/home.css";

const HomeDetail = () => {
    return (
     <div className="home-links">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/signup" className="nav-link">Task</Link>
        <Link to="/login" className="nav-link">Logout</Link>

      </div>    );
};

export default HomeDetail;
