import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";

const UploadEmails = () => {
  const [email, setEmail] = useState("");
  const [emailValidationResult, setEmailValidationResult] = useState<string | null>(null);
  const [emailValidationColor, setEmailValidationColor] = useState("black");

  const handleSingleEmailValidation = async () => {
    if (!email.trim()) {
      setEmailValidationResult("Please enter an email address.");
      setEmailValidationColor("red");
      return;
    }

    try {
      const apiKey = "YOUR_SNAPVALID_API_KEY"; // Replace with actual API key
      const response = await axios.get(
        `https://app.snapvalid.com/api/v1/verify/?apikey=${apiKey}&email=${encodeURIComponent(email)}`
      );

      if (response.data.success) {
        const isValid = response.data.result === "valid";
        setEmailValidationResult(isValid ? "Valid Email ✅" : "Invalid Email ❌");
        setEmailValidationColor(isValid ? "green" : "red");
      } else {
        setEmailValidationResult("Validation failed.");
        setEmailValidationColor("red");
      }
    } catch (error) {
      console.error("Error validating email:", error);
      setEmailValidationResult("Error validating email.");
      setEmailValidationColor("red");
    }
  };

  return (
    <Box>
      <div className={"verify-email-container"}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
        />
        <Button
          variant="contained"
          className={"verify-email-button"}
          onClick={handleSingleEmailValidation}
          sx={{
            color: "black",
            backgroundColor: "#f5cccc",
            "&:hover": { backgroundColor: "#e2bcbc" },
            textTransform: "none",
          }}
        >
          Verify Email
        </Button>
      </div>

      {/* Display Email Validation Result */}
      {emailValidationResult && (
        <Typography sx={{ color: emailValidationColor, marginTop: 1 }}>
          {emailValidationResult}
        </Typography>
      )}
    </Box>
  );
};

export default UploadEmails;