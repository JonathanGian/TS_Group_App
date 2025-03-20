import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // Track registration status
  const baseUrl = "http://localhost:5005/api";

  const handleRegister = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Registration successful!");
        setIsRegistered(true); // Set registration status to true
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
        sx={{ marginTop: 2, marginBottom: 2 }}
      >
        Back to Login
      </Button>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
            disabled={isRegistered} // Disable input after registration
          />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            disabled={isRegistered} // Disable input after registration
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            disabled={isRegistered} // Disable input after registration
          />
          {!isRegistered ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleRegister}
              fullWidth
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          ) : (
            <Typography variant="body1" align="center" sx={{ mt: 2 }}>
              Registration successful! You can now{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                log in
              </Link>
              .
            </Typography>
          )}
          {message && (
            <Typography variant="body1" align="center" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Register;