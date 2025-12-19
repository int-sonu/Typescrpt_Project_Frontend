import { useState, type FC, type FormEvent } from "react";
import api from "../global/axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css"; 

const SignUp: FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await api.post("/user/register", {
        username,
        email,
        password,
      });
      setMessage(response.data.message);
      navigate("/login");
    } catch (error: any) {
  if (error.response?.data?.message) {
    setMessage(error.response.data.message); 
  } else {
    setMessage("Something went wrong. Please try again.");
  }
}
  };

  return (
    <div className="signup-wrapper">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-title">Sign Up</h2>

        <label className="signup-label">
          <span>Name</span>
          <input type="text" value={username} placeholder="Enter your Username" onChange={(e) => setUsername(e.target.value)} required
            className="signup-input"
          />
        </label>

        <label className="signup-label">
          <span>Email</span>
          <input type="email"value={email} placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)}required
            className="signup-input"
          />
        </label>

        <label className="signup-label">
          <span>Password</span>
          <input type="password"value={password}placeholder="Enter your Password"onChange={(e) => setPassword(e.target.value)}required
            className="signup-input"
          />
        </label>

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      <p className="signup-login-text">
          Already have an account?{" "}
          <Link to="/login" className="signup-login-link">
            Log In
          </Link>
        </p>
        {message && <p className="signup-message">{message}</p>}
      </form>
    </div>
  );
};

export default SignUp;
