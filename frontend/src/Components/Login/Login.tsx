import React, { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";
const Login = () => {
  // Added states for username, email, and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
 const baseUrl = "http://localhost:5005/api/auth"; // Base URL for the backend
  const navigate = useNavigate();
 
  // Login function now sends email and password to the backend
  const handleLogin = async () => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Login successful!");
        // Store the token for later authenticated requests
	
		// You can also store the token in localStorage or context for later use
        localStorage.setItem("token", data.token);
      } else {
        setMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred during login. Please try again.");
    }finally {
	// Redirect to the dashboard after successful login
		  if (message === "Login successful!") {
			navigate("/");
		  }		
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
	    <button className="login-button" onClick={handleLogin}>Log In</button>
      <button className="register-button" onClick={()=> navigate("/register")}>Register</button>
	  </div>
	  <div>
      <p>Please log in to continue.</p>
      <p>{message}</p>
	  </div>
    </div>
  );
};

export default Login;