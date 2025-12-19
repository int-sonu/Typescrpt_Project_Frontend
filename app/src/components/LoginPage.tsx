import { useState, type FC, type FormEvent } from "react";
import api from "../global/axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; 

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const HandleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/user/login", { email, password });
      
      const userData = response.data.user; 
      localStorage.setItem("user", JSON.stringify(userData));

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      setMessage(response.data.message);
      navigate("/"); 
    } catch (error) {
      console.log(error);
      setError("Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={HandleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>

        {error && <p className="login-error">{error}</p>}

        <label className="login-label">
          <span>Enter the Email</span>
          <input
            type="email"
            value={email}
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
        </label>

        <label className="login-label">
          <span>Enter the Password</span>
          <input
            type="password"
            value={password}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </label>

        <button type="submit" className="login-button">
          Login
        </button>

        {message && <p className="login-message">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
