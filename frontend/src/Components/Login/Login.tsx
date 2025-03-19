import React, { useEffect, useState } from "react";
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

console.log(loggedIn)
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     // If the user is already logged in, redirect them.
  //     // navigate("/", { replace: true });
  //   }
  // }, []);

  useEffect(() => {
    if (email === "test"){
      
    }
  })

  // Login function now sends email and password to the backend

  const handleLogin = async () => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok || data.token) {
        setMessage("Login successful!");
        // You can also store the token in localStorage or context for later use
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
