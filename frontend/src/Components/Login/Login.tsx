import  { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";


const Login = () => {
  // Added states for username, email, and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const baseUrl = "http://localhost:5005/api/auth"; // Base URL for the backend
  const navigate = useNavigate();
  const { loggedIn, login, logout } = useAuth();
  // Check if the user is already logged in

  useEffect(() => {
    if (loggedIn) {
      navigate("/upload-emails");
    }
  }, [loggedIn, navigate]);

  
  // Check token validity on component mount
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) return; // No token, no need to validate

      try {
        const response = await fetch(`${baseUrl}/validate-token`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          console.log("Token invalid or expired, logging out...");
          localStorage.removeItem("token");
          logout();
        }
      } catch (error) {
        console.error("Error validating token:", error);
        localStorage.removeItem("token");
        logout();
      }
    };

    validateToken();
  }, [logout]);

    // Login function
    const handleLogin = async () => {
      try {
        const response = await fetch(`${baseUrl}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
  
        if (response.ok && data.token) {
          setMessage("Login successful!");
          localStorage.setItem("token", data.token);
          login();
          navigate("/upload-emails");
        } else {
          setMessage(data.message || "Login failed. Please try again.");
        }
      } catch (error) {
        setMessage("An error occurred during login. Please try again.");
      }
    };

  return (
    <div className="login-container">
      <h1>Login</h1>

      <div className="form-group">
        <input
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="button-group">
        <button className="login-button" onClick={handleLogin}>
          Log In
        </button>
        <button
          className="register-button"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
      <div>
        <p>Please log in to continue.</p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Login;
