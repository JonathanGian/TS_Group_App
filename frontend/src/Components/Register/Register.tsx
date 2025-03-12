import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
const Register = () => {
  // Added states for username, email, and password
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const baseUrl = "http://localhost:5005/api"; // Base URL for the backend
  const navigate = useNavigate();
  // Registration sends username, email, and password to the backend
  const handleRegister = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      console.log("Registration response:", data);

      if (response.ok) {
        setMessage(data.message || "Registration successful!");
        
      } else {
        setMessage(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred during registration. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
         <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/login"
        sx={{ marginTop: 2, marginBottom: 2 }}>
            Back to Login
        </Button>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Registration
        </Typography>
        <Box component="form" sx={{ width: "100%" }}>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegister}
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
          {message && (
            <Typography variant="body1" align="center" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            Please register to continue.
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account? <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link> to continue.
          </Typography>
        </Box>
      </Box>
    </Container>

/*  Here it is in the original format but wanted to try MUI   

<div className="login-container">
      <h1>Registration</h1>
      <div className="form-group">
        <input
          className="login-input"
          placeholder="Username (for registration)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
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
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
      </div>
      <p>{message}</p>
      <p>Please register to continue.</p>
      <button
        className="login-button"
        onClick={() => navigate("/login")}
      >Back to Login</button>
      <p>Already have an account? <a href="/login">Login</a> to continue.</p>
    </div> */
  );
};

export default Register;
