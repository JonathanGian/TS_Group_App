import React, { useState } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import { Container, TextField, Button, Typography, Grid, Box } from "@mui/material";

const UploadEmails: React.FC = () => {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    if (email.trim()) {
      formData.append("email", email.trim());
    }

    try {
      const token = localStorage.getItem("token"); // Adjust token retrieval as needed
      const response = await axios.post(
        "http://localhost:5005/api/emails/upload-emails",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
    } catch (error: any) {
      console.error("Error uploading emails:", error);
      setMessage("Error uploading emails");
    }
  };

  return (
    <Container maxWidth="lg">
       <Navigation />

    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Upload Emails
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Single Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box>
              <input
                type="file"
                id="file"
                accept=".txt, .csv"
                onChange={handleFileChange}
                style={{ width: "100%", padding: "8px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ backgroundColor: "#333", color: "#fff", "&:hover": { backgroundColor: "#555" } }}
            >
              Upload
            </Button>
          </Grid>
        </Grid>
      </form>
      {message && (
        <Typography sx={{ marginTop: 2, color: "red" }}>
          {message}
        </Typography>
      )}
    </Container>
    </Container>
  );
};

export default UploadEmails;