import  { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";


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
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
      backgroundColor: "#fbfafa",
    }}
  >
    <Paper
      sx={{
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 400,
        width: "100%",
        background: "linear-gradient(90deg, #f1afba, #7b9ba8)"
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <Box component="form">
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        />
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              fullWidth
            >
              Log In
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/register")}
              fullWidth
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
      {message && (
        <Typography
          variant="body2"
          align="center"
          color="error"
          sx={{ marginTop: 2 }}
        >
          {message}
        </Typography>
      )}
      <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
        Please log in to continue.
      </Typography>
    </Paper>
  </Box>
  );
};

export default Login;
